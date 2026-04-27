'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { PageSectionHeader } from '@/components/PageSectionHeader'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  FileText, Monitor, Video, Plus, X,
  BookOpen, Layers, Zap, Shield, Download,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Level   = 'Beginner' | 'Intermediate' | 'Advanced'
type ResType = 'pdf' | 'slides' | 'video'

interface Resource { type: ResType; name: string }

interface Topic {
  id:        number
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

// ─── Palette ──────────────────────────────────────────────────────────────────

const LEVEL_COLOR: Record<Level, string> = {
  Beginner:     '#5b7eff',
  Intermediate: '#a78bfa',
  Advanced:     '#38bdf8',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEFAULT_DATA: GraphData = {
  topics: [
    {
      id: 0, label: 'Blockchain\nFundamentals', num: '01', level: 'Beginner',
      color: '#5b7eff', x: 0.18, y: 0.5,
      desc: 'The foundational layer of everything — understand what a blockchain is, how consensus works, and why it matters.',
      connects: ['Smart Contracts', 'Wallets', 'Consensus'],
      resources: [
        { type: 'pdf',    name: 'What is a Blockchain' },
        { type: 'slides', name: 'How Transactions Work' },
        { type: 'pdf',    name: 'Consensus Mechanisms' },
      ],
    },
    {
      id: 1, label: 'Wallets &\nTransactions', num: '02', level: 'Beginner',
      color: '#5b7eff', x: 0.35, y: 0.22,
      desc: 'Keys, addresses, signing — the primitives behind every on-chain action.',
      connects: ['Blockchain Fundamentals', 'Smart Contracts', 'DeFi'],
      resources: [
        { type: 'slides', name: 'Keys & Addresses' },
        { type: 'pdf',    name: 'Transaction Lifecycle' },
        { type: 'video',  name: 'MetaMask Walkthrough' },
      ],
    },
    {
      id: 2, label: 'Smart\nContracts', num: '03', level: 'Intermediate',
      color: '#a78bfa', x: 0.5, y: 0.38,
      desc: 'Self-executing code on the blockchain. The building block of DeFi, NFTs, and DAOs.',
      connects: ['Blockchain Fundamentals', 'DeFi', 'DAOs', 'ZK Proofs'],
      resources: [
        { type: 'pdf',    name: 'Introduction to Smart Contracts' },
        { type: 'slides', name: 'Solidity Basics' },
        { type: 'pdf',    name: 'Example Use Cases' },
      ],
    },
    {
      id: 3, label: 'DeFi', num: '04', level: 'Intermediate',
      color: '#a78bfa', x: 0.68, y: 0.22,
      desc: 'Decentralised finance protocols — lending, borrowing, AMMs, yield, and more.',
      connects: ['Smart Contracts', 'Wallets & Transactions', 'DAOs', 'Layer 2'],
      resources: [
        { type: 'pdf',    name: 'What is DeFi' },
        { type: 'slides', name: 'Lending & Borrowing' },
        { type: 'pdf',    name: 'Risks in DeFi' },
      ],
    },
    {
      id: 4, label: 'DAOs', num: '05', level: 'Intermediate',
      color: '#a78bfa', x: 0.68, y: 0.72,
      desc: 'Decentralised autonomous organisations — on-chain governance and collective decision-making.',
      connects: ['Smart Contracts', 'DeFi', 'Tokenomics'],
      resources: [
        { type: 'pdf',    name: 'What is a DAO' },
        { type: 'slides', name: 'Governance Models' },
        { type: 'pdf',    name: 'Real-World Examples' },
      ],
    },
    {
      id: 5, label: 'Layer 2 &\nScaling', num: '06', level: 'Advanced',
      color: '#38bdf8', x: 0.84, y: 0.38,
      desc: 'Rollups, channels and sidechains that scale Ethereum without sacrificing security.',
      connects: ['DeFi', 'ZK Proofs', 'Smart Contracts'],
      resources: [
        { type: 'pdf',    name: 'Rollup Architecture' },
        { type: 'slides', name: 'Optimism vs Arbitrum' },
        { type: 'video',  name: 'L2 Deep Dive' },
      ],
    },
    {
      id: 6, label: 'ZK Proofs', num: '07', level: 'Advanced',
      color: '#38bdf8', x: 0.84, y: 0.65,
      desc: 'Zero-knowledge cryptography — the backbone of privacy, scalability, and trustless computation.',
      connects: ['Smart Contracts', 'Layer 2 & Scaling'],
      resources: [
        { type: 'pdf',    name: 'ZK Proof Primer' },
        { type: 'slides', name: 'SNARKs vs STARKs' },
        { type: 'pdf',    name: 'ZK Applications' },
      ],
    },
    {
      id: 7, label: 'Tokenomics', num: '08', level: 'Advanced',
      color: '#38bdf8', x: 0.5, y: 0.78,
      desc: 'Designing token economies — incentive structures, supply dynamics, and game theory on-chain.',
      connects: ['DAOs', 'DeFi', 'Smart Contracts'],
      resources: [
        { type: 'pdf',    name: 'Token Design Principles' },
        { type: 'slides', name: 'Incentive Mechanisms' },
        { type: 'pdf',    name: 'Case Studies' },
      ],
    },
  ],
  edges: [
    [0,1],[0,2],[1,2],[1,3],[2,3],[2,4],[2,5],[2,6],[3,4],[3,5],[4,7],[5,6],[3,7],[2,7],
  ],
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
    t.level === 'Beginner' ? 34 : t.level === 'Intermediate' ? 30 : 26

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
        const pulse = 1 + ((isHov || isSel) ? 0 : Math.sin(pt + i * 0.8) * 0.04)
        const rr    = r * pulse

        // Glow
        if (isHov || isSel) {
          const grd = ctx.createRadialGradient(p.x, p.y, rr * 0.5, p.x, p.y, rr * 2.4)
          grd.addColorStop(0, t.color + '44')
          grd.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(p.x, p.y, rr * 2.4, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        // Outer ring
        ctx.beginPath()
        ctx.arc(p.x, p.y, rr + 5, 0, Math.PI * 2)
        ctx.strokeStyle = t.color + ((isHov || isSel) ? '66' : '22')
        ctx.lineWidth   = 1
        ctx.stroke()

        // Fill
        const nGrd = ctx.createRadialGradient(p.x - rr * 0.3, p.y - rr * 0.3, 0, p.x, p.y, rr)
        nGrd.addColorStop(0, t.color + 'cc')
        nGrd.addColorStop(1, t.color + '66')
        ctx.beginPath()
        ctx.arc(p.x, p.y, rr, 0, Math.PI * 2)
        ctx.fillStyle   = nGrd
        ctx.fill()
        ctx.strokeStyle = t.color
        ctx.lineWidth   = isSel ? 2 : 1
        ctx.stroke()

        // Label
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        const lines    = t.label.split('\n')
        const fontSize = rr > 30 ? 11 : 10
        ctx.font       = `600 ${fontSize}px 'IBM Plex Sans', sans-serif`
        ctx.fillStyle  = '#ffffff'
        if (lines.length === 1) {
          ctx.fillText(lines[0], p.x, p.y)
        } else {
          ctx.fillText(lines[0], p.x, p.y - fontSize * 0.7)
          ctx.fillText(lines[1], p.x, p.y + fontSize * 0.7)
        }
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

// ─── Add-node modal ───────────────────────────────────────────────────────────

function AddNodeModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd:   (t: Omit<Topic, 'id' | 'num'>) => void
}) {
  const [label,     setLabel]     = useState('')
  const [level,     setLevel]     = useState<Level>('Beginner')
  const [desc,      setDesc]      = useState('')
  const [resName,   setResName]   = useState('')
  const [resType,   setResType]   = useState<ResType>('pdf')
  const [resources, setResources] = useState<Resource[]>([])

  const addRes = () => {
    if (!resName.trim()) return
    setResources(r => [...r, { type: resType, name: resName.trim() }])
    setResName('')
  }

  const submit = () => {
    if (!label.trim()) return
    onAdd({ label, level, color: LEVEL_COLOR[level], x: Math.random() * 0.5 + 0.25, y: Math.random() * 0.5 + 0.25, desc, connects: [], resources })
    onClose()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 13px',
    background: 'var(--bg2)', border: '0.5px solid var(--border)',
    borderRadius: 'var(--r)', color: 'var(--text)',
    fontFamily: 'var(--font-body)', fontSize: 14, outline: 'none',
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(4,6,15,0.72)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
      onClick={onClose}
    >
      <div
        style={{ background: 'var(--surface)', border: '0.5px solid var(--border2)', borderRadius: 'var(--rl)', padding: 28, width: '100%', maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', display: 'flex' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* label */}
          <div>
            <div className="label-secondary" style={{ marginBottom: 6 }}>Topic label</div>
            <input value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Cross-chain Bridges" style={inputStyle} />
          </div>

          {/* level */}
          <div>
            <div className="label-secondary" style={{ marginBottom: 6 }}>Level</div>
            <select value={level} onChange={e => setLevel(e.target.value as Level)} style={inputStyle}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* desc */}
          <div>
            <div className="label-secondary" style={{ marginBottom: 6 }}>Description</div>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Short description…" style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          {/* resources */}
          <div>
            <div className="label-secondary" style={{ marginBottom: 6 }}>Resources</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <select value={resType} onChange={e => setResType(e.target.value as ResType)} style={{ ...inputStyle, width: 'auto', padding: '8px 10px', fontSize: 13 }}>
                <option value="pdf">PDF</option>
                <option value="slides">Slides</option>
                <option value="video">Video</option>
              </select>
              <input value={resName} onChange={e => setResName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addRes()} placeholder="Resource name" style={{ ...inputStyle, flex: 1, padding: '8px 12px', fontSize: 13 }} />
              <button onClick={addRes} style={{ padding: '8px 12px', background: 'rgba(91,126,255,0.12)', border: '0.5px solid var(--border2)', borderRadius: 'var(--r)', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Plus size={14} />
              </button>
            </div>
            {resources.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', marginBottom: 6, background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)', display: 'flex' }}><ResIcon type={r.type} /></span>
                <span style={{ flex: 1 }}>{r.name}</span>
                <button onClick={() => setResources(rs => rs.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dim)', display: 'flex' }}>
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-outline btn-sm">Cancel</button>
          <button onClick={submit}  className="btn btn-primary btn-sm">Add to Graph</button>
        </div>
      </div>
    </div>
  )
}

// ─── Topic detail panel ───────────────────────────────────────────────────────

function TopicPanel({ topic }: { topic: Topic }) {
  const col = LEVEL_COLOR[topic.level]
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {topic.resources.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(91,126,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: col, flexShrink: 0 }}>
                <ResIcon type={r.type} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--dim)' }}>{r.type}</div>
              </div>
              <button className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <Download size={12} /> Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EducationPage() {
  const [graphData, setGraphData] = useState<GraphData>(DEFAULT_DATA)
  const [selected,  setSelected]  = useState<number | null>(null)
  const [showModal, setShowModal] = useState(false)

  const selectedTopic = selected !== null ? (graphData.topics[selected] ?? null) : null

  const handleAddNode = useCallback((partial: Omit<Topic, 'id' | 'num'>) => {
    setGraphData(prev => ({
      ...prev,
      topics: [...prev.topics, { ...partial, id: prev.topics.length, num: String(prev.topics.length + 1).padStart(2, '0') }],
    }))
  }, [])

  const tracks = [
    { icon: Layers, color: '#5b7eff', title: 'Beginner Track',    desc: 'Foundations of blockchain, consensus, wallets, and your first transactions on-chain.', count: 3 },
    { icon: Zap,    color: '#a78bfa', title: 'Intermediate Track', desc: 'Smart contracts, DeFi protocols, DAOs and governance. Build your first dApp.',        count: 3 },
    { icon: Shield, color: '#38bdf8', title: 'Advanced Track',     desc: 'Layer 2 scaling, ZK proofs, SNARKs/STARKs, and deep tokenomic design.',               count: 2 },
  ]

  const startCards = [
    { icon: FileText, label: 'What is Blockchain',    meta: '12 pages · Beginner' },
    { icon: Monitor,  label: 'Wallets & Transactions', meta: '18 slides · Beginner' },
    { icon: BookOpen, label: 'Smart Contracts Basics', meta: '8 pages · Beginner' },
  ]

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
                  <span>8 core topics</span>
                  <span>3 difficulty levels</span>
                  <span>Club-authored resources</span>
                </div>
              </div>

              {/* Start Here */}
              <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', borderRadius: 'var(--rl)', padding: 28, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 110, height: 110, background: 'radial-gradient(circle,rgba(91,126,255,0.08),transparent)', borderRadius: '50%', transform: 'translate(30%,-30%)', pointerEvents: 'none' }} />
                <div className="label" style={{ marginBottom: 16 }}>Start Here</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {startCards.map((s, i) => {
                    const Icon = s.icon
                    return (
                      <StartItem key={i} icon={<Icon size={14} />} label={s.label} meta={s.meta} />
                    )
                  })}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {tracks.map((track, i) => {
                  const Icon = track.icon
                  return (
                    <ScrollReveal key={i} delay={80 + i * 80}>
                      <TrackCard icon={<Icon size={20} strokeWidth={1.5} />} color={track.color} title={track.title} desc={track.desc} count={track.count} />
                    </ScrollReveal>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* ── Knowledge Graph ───────────────────────────────── */}
          <div style={{ paddingBottom: 80 }}>

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

            {/* canvas */}
            <div style={{ position: 'relative', width: '100%', height: 480, overflow: 'hidden', borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)', background: 'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(91,126,255,0.04) 0%,transparent 70%)' }}>
              <CanvasGraph data={graphData} selectedId={selected} onSelect={setSelected} />
            </div>

            {/* detail / hint */}
            <div style={{ maxWidth: 'var(--page-width)', margin: '0 auto', padding: '40px var(--page-pad-x) 0' }}>
              {selectedTopic
                ? <TopicPanel topic={selectedTopic} />
                : <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--dim)', fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}> Click a node to explore resources</div>
              }
            </div>
          </div>

        </main>

        <Footer />
      </div>

      {showModal && <AddNodeModal onClose={() => setShowModal(false)} onAdd={handleAddNode} />}
    </>
  )
}

// ─── Small helper components (keeps JSX readable) ────────────────────────────

function StartItem({ icon, label, meta }: { icon: React.ReactNode; label: string; meta: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--surface2)', border: `0.5px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`, borderRadius: 'var(--r)', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.2s', transform: hovered ? 'translateX(3px)' : '' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(91,126,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.3px' }}>{meta}</div>
      </div>
    </div>
  )
}

function TrackCard({ icon, color, title, desc, count }: { icon: React.ReactNode; color: string; title: string; desc: string; count: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ background: 'var(--surface)', border: `0.5px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`, borderRadius: 'var(--rl)', padding: '28px 24px 22px', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s', transform: hovered ? 'translateY(-2px)' : '' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: color, opacity: 0.7, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.3s' }} />
      <div style={{ color, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px', marginBottom: 8, color: 'var(--text)' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '0.5px' }}>{count} modules</span>
        <button style={{ background: 'transparent', border: `0.5px solid ${color}`, borderRadius: 'var(--r)', padding: '5px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer', color, fontFamily: 'var(--font-body)', transition: 'opacity 0.2s' }}>
          Explore 
        </button>
      </div>
    </div>
  )
}

function HoverButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', background: hovered ? 'rgba(91,126,255,0.06)' : 'transparent', border: `0.5px solid ${hovered ? 'var(--accent)' : 'var(--border2)'}`, borderRadius: 'var(--r)', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: hovered ? 'var(--accent)' : 'var(--text)', cursor: 'pointer', letterSpacing: '0.3px', transition: 'all 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}