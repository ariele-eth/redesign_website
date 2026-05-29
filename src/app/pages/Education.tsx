'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { CmsEmptyState } from '@/components/CmsEmptyState'
import { PageSectionHeader } from '@/components/PageSectionHeader'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  FileText, Monitor, Video,
  Layers, Zap, Shield, Download, BookOpen, Network, GraduationCap,
} from 'lucide-react'
import { toPlainText } from '@/sanity/lib/portableText'

// ─── Types ────────────────────────────────────────────────────────────────────

type Level   = 'Beginner' | 'Intermediate' | 'Advanced'
type ResType = 'pdf' | 'slides' | 'video'

interface Resource { type: ResType; name: string; url?: string | null }

interface Topic {
  id:        number
  sourceNodeId: string
  label:     string
  num:       string
  level:     Level
  color:     string
  x:         number
  y:         number
  desc:      string
  connects:  string[]
  resources: Resource[]
}

interface GraphData { topics: Topic[]; edges: [number, number][] }

type KnowledgeNode = {
  _id: string
  title: string
  level?: Level | null
  popupContent?: unknown
  connections?: Array<{ _id: string; title: string }>
  resources?: Array<{
    title: string
    kind?: string | null
    fileUrl?: string | null
    url?: string | null
    storageUrl?: string | null
  }>
}

type LearningTrack = {
  _id: string
  title: string
  summary: string
  details?: unknown
  level?: Level | null
  ctaLink?: string | null
  nodes?: Array<{ _id: string }>
}

type StartHereEntry = {
  _key: string
  label?: string | null
  resourceTitle?: string | null
  node?: KnowledgeNode | null
}

type StartHereCard = {
  id: string
  nodeId: string
  label: string
  meta: string
  type: ResType
  resourceTitle?: string | null
}

type EducationProps = {
  knowledgeNodes: KnowledgeNode[]
  learningTracks: LearningTrack[]
  startHereEntries: StartHereEntry[]
}

// ─── Palette ──────────────────────────────────────────────────────────────────

const LEVEL_COLOR: Record<Level, string> = {
  Beginner:     '#5b7eff',
  Intermediate: '#a78bfa',
  Advanced:     '#38bdf8',
}

const TRACK_ICONS: Record<Level, typeof Layers> = {
  Beginner: Layers,
  Intermediate: Zap,
  Advanced: Shield,
}

function resolveLevel(value?: string | null): Level | null {
  if (value === 'Beginner' || value === 'Intermediate' || value === 'Advanced') {
    return value
  }
  return null
}

function findResourceForEntry(node: KnowledgeNode, resourceTitle?: string | null) {
  const resources = node.resources ?? []
  if (!resources.length) return null

  if (resourceTitle?.trim()) {
    const wanted = resourceTitle.trim().toLowerCase()
    const exactMatch = resources.find((resource) => resource.title.trim().toLowerCase() === wanted)
    if (exactMatch) return exactMatch
  }

  return resources[0]
}

function buildMeta(type: ResType, nodeTitle: string) {
  return `${type.toUpperCase()} · ${nodeTitle}`
}

function normalizeResourceType(kind?: string | null, url?: string | null): ResType {
  const lower = (kind ?? '').toLowerCase()
  if (lower.includes('slide')) return 'slides'
  if (lower.includes('video')) return 'video'
  if (lower.includes('pdf')) return 'pdf'

  if (url) {
    if (url.endsWith('.pdf')) return 'pdf'
    if (url.match(/\.(pptx?|key)$/i)) return 'slides'
    if (url.match(/\.(mp4|mov|webm)$/i)) return 'video'
  }

  return 'pdf'
}

function buildGraphData(nodes: KnowledgeNode[]): GraphData {
  if (!nodes.length) return { topics: [], edges: [] }

  const total = nodes.length
  const idToIndex = new Map(nodes.map((node, index) => [node._id, index]))
  const edgesSet = new Set<string>()

  const topics: Topic[] = nodes.map((node, index) => {
    const angle = (Math.PI * 2 * index) / total
    const radius = 0.3 + (index % 2) * 0.08
    const x = Math.min(0.86, Math.max(0.14, 0.5 + radius * Math.cos(angle)))
    const y = Math.min(0.82, Math.max(0.18, 0.5 + radius * Math.sin(angle)))
    const level: Level = resolveLevel(node.level) ?? 'Beginner'

    const resources = (node.resources ?? []).map((resource) => {
      const resourceUrl = resource.storageUrl ?? resource.fileUrl ?? resource.url ?? null
      const type = normalizeResourceType(resource.kind, resourceUrl)
      return {
        type,
        name: resource.title,
        url: resourceUrl,
      }
    })

    const connects = (node.connections ?? []).map((connection) => connection.title)

    return {
      id: index,
      sourceNodeId: node._id,
      num: String(index + 1).padStart(2, '0'),
      label: node.title,
      level,
      color: LEVEL_COLOR[level],
      x,
      y,
      desc: toPlainText(node.popupContent) || 'Details coming soon.',
      connects,
      resources,
    }
  })

  nodes.forEach((node, index) => {
    node.connections?.forEach((connection) => {
      const targetIndex = idToIndex.get(connection._id)
      if (targetIndex === undefined) return
      const a = Math.min(index, targetIndex)
      const b = Math.max(index, targetIndex)
      edgesSet.add(`${a}-${b}`)
    })
  })

  const edges: [number, number][] = Array.from(edgesSet).map((key) => {
    const [a, b] = key.split('-').map(Number)
    return [a, b]
  })

  return { topics, edges }
}

// ─── Canvas graph component ───────────────────────────────────────────────────

interface CanvasGraphProps {
  data:       GraphData
  selectedId: number | null
  onSelect:   (id: number) => void
}

function CanvasGraph({ data, selectedId, onSelect }: CanvasGraphProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const rafRef     = useRef<number>(0)
  const pulseRef   = useRef(0)
  const hoveredRef = useRef(-1)

  const nodeRadius = (t: Topic) =>
    t.level === 'Beginner' ? 36 : t.level === 'Intermediate' ? 33 : 30

  const getPos = (t: Topic, w: number, h: number) => ({
    x: t.x * w,
    y: t.y * h,
  })

  // Resize canvas to wrapper
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const wrapper = canvas.parentElement!
    const ro = new ResizeObserver(() => {
      canvas.width  = wrapper.offsetWidth
      canvas.height = wrapper.offsetHeight
    })
    ro.observe(wrapper)
    canvas.width  = wrapper.offsetWidth
    canvas.height = wrapper.offsetHeight
    return () => ro.disconnect()
  }, [])

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function draw() {
      if (!canvas) return
      pulseRef.current += 0.02
      const pt = pulseRef.current
      const W  = canvas.width
      const H  = canvas.height

      ctx.clearRect(0, 0, W, H)

      // — Edges —
      data.edges.forEach(([a, b]) => {
        const ta = data.topics[a]
        const tb = data.topics[b]
        if (!ta || !tb) return
        const pa   = getPos(ta, W, H)
        const pb   = getPos(tb, W, H)
        const isHov = hoveredRef.current === a || hoveredRef.current === b
        const isSel = selectedId === a || selectedId === b
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.strokeStyle  = (isHov || isSel) ? 'rgba(91,126,255,0.45)' : 'rgba(91,126,255,0.12)'
        ctx.lineWidth    = (isHov || isSel) ? 1.5 : 0.8
        if (!isHov && !isSel) {
          ctx.setLineDash([4, 8])
          ctx.lineDashOffset = -(pt * 12)
        } else {
          ctx.setLineDash([])
          ctx.lineDashOffset = 0
        }
        ctx.stroke()
        ctx.setLineDash([])
      })

      // — Nodes —
      data.topics.forEach((t, i) => {
        const p     = getPos(t, W, H)
        const r     = nodeRadius(t)
        const isHov = hoveredRef.current === i
        const isSel = selectedId === i
        const pulse = 1 + ((isHov || isSel) ? 0 : Math.sin(pt + i * 0.8) * 0.03)
        const rr    = r * pulse

        const glow = ctx.createRadialGradient(p.x, p.y, rr * 0.4, p.x, p.y, rr * 2.2)
        glow.addColorStop(0, `${t.color}${isSel ? '4d' : isHov ? '33' : '1a'}`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, rr * 2.2, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, rr + 7, 0, Math.PI * 2)
        ctx.strokeStyle = `${t.color}${isSel ? '8c' : isHov ? '66' : '2e'}`
        ctx.lineWidth = isSel ? 2.4 : 1.1
        ctx.stroke()

        const core = ctx.createRadialGradient(p.x - rr * 0.25, p.y - rr * 0.25, rr * 0.15, p.x, p.y, rr * 1.1)
        core.addColorStop(0, 'rgba(24, 34, 66, 0.98)')
        core.addColorStop(1, 'rgba(8, 13, 31, 0.96)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, rr, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()

        const tint = ctx.createRadialGradient(p.x, p.y, rr * 0.15, p.x, p.y, rr)
        tint.addColorStop(0, `${t.color}55`)
        tint.addColorStop(1, `${t.color}0f`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, rr, 0, Math.PI * 2)
        ctx.fillStyle = tint
        ctx.fill()

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const lines = t.label.split('\n')
        const fontSize = rr > 32 ? 11 : 10
        ctx.font = `600 ${fontSize}px 'IBM Plex Sans', sans-serif`
        ctx.fillStyle = '#e8edff'
        if (lines.length === 1) {
          ctx.fillText(lines[0], p.x, p.y + 1)
        } else {
          ctx.fillText(lines[0], p.x, p.y - fontSize * 0.65)
          ctx.fillText(lines[1], p.x, p.y + fontSize * 0.65)
        }
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [data, selectedId])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect   = canvas.getBoundingClientRect()
    const mx     = (e.clientX - rect.left) * (canvas.width  / rect.width)
    const my     = (e.clientY - rect.top)  * (canvas.height / rect.height)
    let found = -1
    data.topics.forEach((t, i) => {
      const p = getPos(t, canvas.width, canvas.height)
      if (Math.hypot(mx - p.x, my - p.y) < nodeRadius(t) + 6) found = i
    })
    hoveredRef.current       = found
    canvas.style.cursor      = found >= 0 ? 'pointer' : 'default'
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!
    const rect   = canvas.getBoundingClientRect()
    const mx     = (e.clientX - rect.left) * (canvas.width  / rect.width)
    const my     = (e.clientY - rect.top)  * (canvas.height / rect.height)
    data.topics.forEach((t, i) => {
      const p = getPos(t, canvas.width, canvas.height)
      if (Math.hypot(mx - p.x, my - p.y) < nodeRadius(t) + 6) onSelect(i)
    })
  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  )
}

// ─── Resource icon ────────────────────────────────────────────────────────────

function ResIcon({ type }: { type: ResType }) {
  if (type === 'pdf')    return <FileText size={14} />
  if (type === 'slides') return <Monitor  size={14} />
  return                        <Video    size={14} />
}

// ─── Topic detail panel ───────────────────────────────────────────────────────

function TopicPanel({
  topic,
  highlightResourceTitle,
}: {
  topic: Topic
  highlightResourceTitle?: string | null
}) {
  const col = LEVEL_COLOR[topic.level]
  const hasResources = topic.resources.length > 0
  return (
    <div
      key={topic.id}
      style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, animation: 'panelIn 0.3s cubic-bezier(0.16,1,0.3,1)' }}
    >
      {/* meta */}
      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--rl)', padding: 24 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 48, fontWeight: 800, color: col, lineHeight: 1, opacity: 0.18, marginBottom: 8 }}>
          {topic.num}
        </div>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 17, fontWeight: 600, marginBottom: 10, color: 'var(--text)' }}>
          {topic.label.replace('\n', ' ')}
        </h3>
        <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20, background: col + '18', color: col, border: `0.5px solid ${col}33`, marginBottom: 16 }}>
          {topic.level}
        </span>
        <div className="label" style={{ marginBottom: 6 }}>Description</div>
        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{topic.desc}</p>
        {topic.connects.length > 0 && (
          <>
            <div className="label" style={{ marginTop: 16, marginBottom: 8 }}>Connects to</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {topic.connects.map(c => (
                <span key={c} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: 11, color: 'var(--text-secondary)', border: '0.5px solid var(--border2)', background: 'rgba(91,126,255,0.06)' }}>
                  {c}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* resources */}
      <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--rl)', padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 15, fontWeight: 600, marginBottom: 18, color: 'var(--text)' }}>Resources</h3>
        {hasResources ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topic.resources.map((r, i) => {
              const isHighlighted =
                !!highlightResourceTitle &&
                r.name.trim().toLowerCase() === highlightResourceTitle.trim().toLowerCase()

              return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 16px',
                  background: isHighlighted ? 'rgba(91,126,255,0.12)' : 'var(--bg2)',
                  border: isHighlighted ? `0.5px solid ${col}99` : '0.5px solid var(--border)',
                  borderRadius: 'var(--r)',
                }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(91,126,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: col, flexShrink: 0 }}>
                  <ResIcon type={r.type} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--dim)' }}>{r.type}</div>
                </div>
                {r.url ? (
                  <a
                    className="btn btn-outline btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={12} /> Open
                  </a>
                ) : (
                  <span
                    className="btn btn-outline btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, opacity: 0.6 }}
                  >
                    <Download size={12} /> Unavailable
                  </span>
                )}
              </div>
              )
            })}
          </div>
        ) : (
          <CmsEmptyState
            title="No resources listed yet."
            description="Learning resources for this topic will appear once they are published."
            icon={BookOpen}
          />
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EducationPage({ knowledgeNodes, learningTracks, startHereEntries }: EducationProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null)
  const [highlightedResourceTitle, setHighlightedResourceTitle] = useState<string | null>(null)
  const [pendingJump, setPendingJump] = useState<{ nodeId: string; resourceTitle?: string | null } | null>(null)
  const graphSectionRef = useRef<HTMLDivElement>(null)
  const detailsSectionRef = useRef<HTMLDivElement>(null)

  const activeTrack = useMemo(
    () => learningTracks.find((track) => track._id === activeTrackId) ?? null,
    [activeTrackId, learningTracks]
  )

  const scopedKnowledgeNodes = useMemo(() => {
    if (!activeTrack) return knowledgeNodes

    const explicitNodeIds = (activeTrack.nodes ?? []).map((node) => node._id).filter(Boolean)
    if (explicitNodeIds.length > 0) {
      const allowed = new Set(explicitNodeIds)
      return knowledgeNodes.filter((node) => allowed.has(node._id))
    }

    const level = resolveLevel(activeTrack.level)
    if (!level) return knowledgeNodes
    return knowledgeNodes.filter((node) => resolveLevel(node.level) === level)
  }, [activeTrack, knowledgeNodes])

  const graphData = useMemo(() => buildGraphData(scopedKnowledgeNodes), [scopedKnowledgeNodes])
  const selectedTopic = selected !== null ? (graphData.topics[selected] ?? null) : null

  const legacyStartCards = useMemo(() => {
    const cards: Array<{ id: string; label: string; meta: string; type: ResType }> = []

    knowledgeNodes.forEach((node) => {
      node.resources?.forEach((resource) => {
        if (cards.length >= 3) return
        const resourceUrl = resource.storageUrl ?? resource.fileUrl ?? resource.url ?? null
        const type = normalizeResourceType(resource.kind, resourceUrl)
        cards.push({
          id: `${node._id}-${resource.title}`,
          label: resource.title,
          meta: `${type.toUpperCase()} · ${node.title}`,
          type,
        })
      })
    })

    return cards
  }, [knowledgeNodes])

  const trackNodeCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    learningTracks.forEach((track) => {
      const explicitNodeIds = (track.nodes ?? []).map((node) => node._id).filter(Boolean)
      if (explicitNodeIds.length > 0) {
        const allowed = new Set(explicitNodeIds)
        counts[track._id] = knowledgeNodes.filter((node) => allowed.has(node._id)).length
        return
      }

      const level = resolveLevel(track.level)
      counts[track._id] = level
        ? knowledgeNodes.filter((node) => resolveLevel(node.level) === level).length
        : knowledgeNodes.length
    })

    return counts
  }, [knowledgeNodes, learningTracks])

  useEffect(() => {
    if (selected === null) return
    if (selected < graphData.topics.length) return
    setSelected(null)
  }, [graphData.topics.length, selected])

  useEffect(() => {
    if (!activeTrack || selected !== null) return
    if (!graphData.topics.length) return
    setSelected(0)
  }, [activeTrack, graphData.topics.length, selected])

  useEffect(() => {
    if (!pendingJump) return
    const topicIndex = graphData.topics.findIndex((topic) => topic.sourceNodeId === pendingJump.nodeId)
    if (topicIndex < 0) return

    setSelected(topicIndex)
    setHighlightedResourceTitle(pendingJump.resourceTitle ?? null)
    setPendingJump(null)

    window.setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 70)
  }, [graphData.topics, pendingJump])

  const scrollToGraph = () => {
    graphSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleExploreTrack = (trackId: string) => {
    setActiveTrackId(trackId)
    setSelected(null)
    setPendingJump(null)
    setHighlightedResourceTitle(null)
    scrollToGraph()
  }

  const handleResetTrack = () => {
    setActiveTrackId(null)
    setSelected(null)
    setHighlightedResourceTitle(null)
  }

  const handleSelectTopic = (topicId: number) => {
    setSelected(topicId)
    setHighlightedResourceTitle(null)
  }

  const startCards = useMemo(() => {
    void legacyStartCards
    const curatedCards: StartHereCard[] = []
    const visibleNodeById = new Map(knowledgeNodes.map((node) => [node._id, node]))

    startHereEntries.forEach((entry) => {
      const nodeId = entry.node?._id
      if (!nodeId) return
      const node = visibleNodeById.get(nodeId) ?? entry.node
      if (!node?._id || !node.title) return

      const resource = findResourceForEntry(node, entry.resourceTitle)
      const resourceUrl = resource
        ? resource.storageUrl ?? resource.fileUrl ?? resource.url ?? null
        : null
      const type = normalizeResourceType(resource?.kind, resourceUrl)

      curatedCards.push({
        id: entry._key,
        nodeId: node._id,
        label: entry.label?.trim() || resource?.title || node.title,
        meta: buildMeta(type, node.title),
        type,
        resourceTitle: resource?.title ?? entry.resourceTitle ?? null,
      })
    })

    if (curatedCards.length > 0) {
      return curatedCards
    }

    const fallbackCards: StartHereCard[] = []
    knowledgeNodes.forEach((node) => {
      node.resources?.forEach((resource) => {
        if (fallbackCards.length >= 3) return
        const resourceUrl = resource.storageUrl ?? resource.fileUrl ?? resource.url ?? null
        const type = normalizeResourceType(resource.kind, resourceUrl)
        fallbackCards.push({
          id: `${node._id}-${resource.title}`,
          nodeId: node._id,
          label: resource.title,
          meta: buildMeta(type, node.title),
          type,
          resourceTitle: resource.title,
        })
      })
    })

    return fallbackCards
  }, [knowledgeNodes, startHereEntries, legacyStartCards])

  const handleStartHereCardClick = (card: StartHereCard) => {
    setActiveTrackId(null)
    setSelected(null)
    setPendingJump({ nodeId: card.nodeId, resourceTitle: card.resourceTitle })
  }

  return (
    <>
      <style>{`@keyframes panelIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="about-page min-h-screen" style={{ position: 'relative' }}>
        <div className="page-grid-bg" />

        {/* hero glow */}
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 500, background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(91,126,255,0.06),transparent)', pointerEvents: 'none', zIndex: 0 }} />

        <Navigation />

        <main style={{ position: 'relative', zIndex: 1 }}>

          {/* ── Hero ─────────────────────────────────────────── */}
          <section className="about-hero-shell page-hero-shell page-hero-compact">
            <div className="about-hero-grid">

              <div className="about-hero-copy">
                <div className="hero-top-brand">
                  <span className="hero-top-line" />
                  <span className="hero-top-text">LEARNING HUB</span>
                </div>
                <h1 className="hero-title-main">
                  <span>Education</span>
                  <span className="outline">Hub</span>
                </h1>
                <p className="hero-subtext">
                  A structured Web3 knowledge graph — from zero to building production-grade decentralised applications.
                </p>
                <p className="about-hero-subtext">
                  Explore topics interactively, follow curated learning tracks, and access club-authored resources at every level.
                </p>
                <div className="about-hero-points">
                  <span>{knowledgeNodes.length} core topics</span>
                  <span>{learningTracks.length} learning tracks</span>
                  <span>Club-authored resources</span>
                </div>
              </div>

              {/* Start Here */}
              <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--rl)', padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 110, height: 110, background: 'radial-gradient(circle,rgba(91,126,255,0.08),transparent)', borderRadius: '50%', transform: 'translate(30%,-30%)', pointerEvents: 'none' }} />
                <div className="label" style={{ marginBottom: 16 }}>Start Here</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {startCards.length ? (
                    startCards.map((s) => {
                      const Icon = s.type === 'slides' ? Monitor : s.type === 'video' ? Video : FileText
                      return (
                        <StartItem
                          key={s.id}
                          icon={<Icon size={14} />}
                          label={s.label}
                          meta={s.meta}
                          onClick={() => handleStartHereCardClick(s)}
                        />
                      )
                    })
                  ) : (
                    <CmsEmptyState
                      title="No starter resources yet."
                      description="Starter materials will appear here once they are published."
                      icon={BookOpen}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ── Learning Tracks ──────────────────────────────── */}
          <div className="container section-sm">
            <ScrollReveal>
              <PageSectionHeader label="Curriculum" title="Learning Tracks" className="about-section-header-block" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              {learningTracks.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                  {learningTracks.map((track, i) => {
                    const level = resolveLevel(track.level) ?? (i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced')
                    const Icon = TRACK_ICONS[level]
                    const color = LEVEL_COLOR[level]
                    const nodeCount = trackNodeCounts[track._id] ?? 0
                    return (
                      <ScrollReveal key={track._id} delay={80 + i * 80}>
                        <TrackCard
                          icon={<Icon size={20} strokeWidth={1.5} />}
                          color={color}
                          title={track.title}
                          desc={track.summary}
                          level={level}
                          nodeCount={nodeCount}
                          isActive={activeTrackId === track._id}
                          onExplore={() => handleExploreTrack(track._id)}
                        />
                      </ScrollReveal>
                    )
                  })}
                </div>
              ) : (
                <CmsEmptyState
                  title="No learning tracks available yet."
                  description="Track cards will appear here once they are published."
                  icon={GraduationCap}
                  className="mx-auto max-w-4xl"
                />
              )}
            </ScrollReveal>
          </div>

          {/* ── Knowledge Graph ───────────────────────────────── */}
          <div id="knowledge-graph" ref={graphSectionRef} style={{ paddingBottom: 80, scrollMarginTop: 88 }}>

            {/* header */}
            <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto', padding: '60px var(--page-pad-x) 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="label" style={{ marginBottom: 4 }}>Knowledge Graph</div>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 700, letterSpacing: '-1px', color: 'var(--text)' }}>
                  How topics connect
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* legend */}
                <div style={{ display: 'flex', gap: 18 }}>
                  {(Object.entries(LEVEL_COLOR) as [Level, string][]).map(([lvl, col]) => (
                    <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.5px' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: col }} />
                      {lvl}
                    </div>
                  ))}
                </div>
                {/* add button */}
              </div>
            </div>

            {activeTrack ? (
              <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto', padding: '0 var(--page-pad-x) 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--r)', padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.3px' }}>
                    Viewing <strong style={{ color: 'var(--text)' }}>{activeTrack.title}</strong> ({graphData.topics.length} nodes)
                  </div>
                  <button
                    type="button"
                    onClick={handleResetTrack}
                    style={{ border: '0.5px solid var(--border2)', color: 'var(--text)', background: 'transparent', borderRadius: 'var(--r)', fontSize: 11, padding: '5px 10px', cursor: 'pointer' }}
                  >
                    Show all nodes
                  </button>
                </div>
              </div>
            ) : null}

            {/* canvas */}
            {graphData.topics.length > 0 ? (
              <div style={{ position: 'relative', width: '100%', height: 480, overflow: 'hidden', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', background: 'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(91,126,255,0.04) 0%,transparent 70%)' }}>
                <CanvasGraph data={graphData} selectedId={selected} onSelect={handleSelectTopic} />
              </div>
            ) : (
              <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto', padding: '0 var(--page-pad-x)' }}>
                <CmsEmptyState
                  title={activeTrack ? 'No nodes in this track yet.' : 'No knowledge topics available yet.'}
                  description={activeTrack ? 'Assign nodes to this learning track in Sanity to populate this view.' : 'Knowledge graph nodes will appear here once they are published.'}
                  icon={Network}
                  className="mx-auto max-w-4xl"
                />
              </div>
            )}

            {/* detail / hint */}
            <div ref={detailsSectionRef} style={{ maxWidth: 'var(--page-width)', margin: '0 auto', padding: '40px var(--page-pad-x) 0', scrollMarginTop: 88 }}>
              {graphData.topics.length === 0 ? (
                <CmsEmptyState
                  title={activeTrack ? 'No topic details in this track yet.' : 'No topic details available yet.'}
                  description={activeTrack ? 'Add or assign nodes to this track to view topic details here.' : 'Topic details will appear once knowledge nodes are published.'}
                  icon={BookOpen}
                  className="mx-auto max-w-4xl"
                />
              ) : selectedTopic
                ? <TopicPanel topic={selectedTopic} highlightResourceTitle={highlightedResourceTitle} />
                : <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--dim)', fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}> Click a node to explore resources</div>
              }
            </div>
          </div>

        </main>

        <Footer />
      </div>

    </>
  )
}

// ─── Small helper components (keeps JSX readable) ────────────────────────────

function StartItem({
  icon,
  label,
  meta,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  meta: string
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      type="button"
      style={{ display: 'flex', width: '100%', textAlign: 'left', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--surface2)', border: `0.5px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`, borderRadius: 'var(--r)', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', transform: hovered ? 'translateX(3px)' : '', appearance: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(91,126,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.3px' }}>{meta}</div>
      </div>
    </button>
  )
}

function TrackCard({
  icon,
  color,
  title,
  desc,
  level,
  nodeCount,
  isActive,
  onExplore,
}: {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
  level: Level
  nodeCount: number
  isActive: boolean
  onExplore: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ background: 'var(--surface)', border: `0.5px solid ${isActive ? color : hovered ? 'var(--border2)' : 'var(--border)'}`, borderRadius: 'var(--rl)', padding: '28px 24px 22px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', transform: hovered ? 'translateY(-2px)' : '' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.7, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s' }} />
      <div style={{ color, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px', marginBottom: 8, color: 'var(--text)' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.5px' }}>
          {nodeCount} nodes · {level}
        </span>
        <button
          type="button"
          onClick={onExplore}
          style={{ background: 'transparent', border: `0.5px solid ${color}`, borderRadius: 'var(--r)', padding: '5px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer', color, fontFamily: 'var(--font-body)', transition: 'opacity 0.2s' }}
        >
          Explore
        </button>
      </div>
    </div>
  )
}

