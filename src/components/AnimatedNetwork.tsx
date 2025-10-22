'use client'
import { useRef, useEffect } from 'react'

// Animated Network Component
export const AnimatedNetwork = ({ fixed = false }: { fixed?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Get primary color from CSS variable
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim()

    interface Node {
      x: number
      y: number
      z: number
      projectedX: number
      projectedY: number
      opacity: number
      scale: number
    }

    interface Connection {
      from: number
      to: number
      progress: number
      active: boolean
    }

    // Variables that update on resize
    let canvasWidth = canvas.offsetWidth
    let canvasHeight = canvas.offsetHeight
    let centerX = canvasWidth / 2
    let centerY = canvasHeight / 2
    let sphereRadius = Math.min(canvasWidth, canvasHeight) * 0.35

    // Set initial canvas size
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    ctx.scale(dpr, dpr)

    const nodes: Node[] = []
    const nodeCount = 80

    // Create nodes on sphere surface using Fibonacci sphere distribution
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta)
      const z = sphereRadius * Math.cos(phi)

      nodes.push({
        x,
        y,
        z,
        projectedX: 0,
        projectedY: 0,
        opacity: 0.5,
        scale: 1,
      })
    }

    const connections: Connection[] = []
    let lastActivation = Date.now()
    let rotation = 0

    function animate() {
      if (!ctx || !canvas) return

      // Clear with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Rotate sphere more slowly
      rotation += 0.0005

      // Project 3D nodes to 2D
      nodes.forEach((node) => {
        // Rotate around Y axis
        const rotatedX =
          node.x * Math.cos(rotation) - node.z * Math.sin(rotation)
        const rotatedZ =
          node.x * Math.sin(rotation) + node.z * Math.cos(rotation)

        // Perspective projection
        const perspective = 800
        const scale = perspective / (perspective + rotatedZ)

        node.projectedX = centerX + rotatedX * scale
        node.projectedY = centerY + node.y * scale
        node.scale = scale

        // Opacity based on depth (front nodes brighter) - boosted for clarity
        node.opacity = 0.35 + (scale - 0.4) * 0.9
      })

      // Draw connections between nearby nodes
      connections.length = 0
      for (let i = 0; i < nodes.length; i++) {
        // Only draw front-facing nodes
        if (nodes[i].scale < 0.5) continue

        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].scale < 0.5) continue

          // Calculate 3D distance on sphere
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dz = nodes[i].z - nodes[j].z
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance3D < sphereRadius * 0.9) {
            const avgScale = (nodes[i].scale + nodes[j].scale) / 2
            const opacity =
              (1 - distance3D / (sphereRadius * 0.9)) * 0.4 * avgScale

            ctx.beginPath()
            ctx.moveTo(nodes[i].projectedX, nodes[i].projectedY)
            ctx.lineTo(nodes[j].projectedX, nodes[j].projectedY)
            ctx.strokeStyle = `hsl(${primaryColor} / ${opacity})`
            ctx.lineWidth = 1.25
            ctx.stroke()

            connections.push({
              from: i,
              to: j,
              progress: 0,
              active: false,
            })
          }
        }
      }

      // Draw nodes (sorted by depth for proper layering)
      const sortedIndices = nodes
        .map((_, idx) => idx)
        .sort((a, b) => nodes[a].scale - nodes[b].scale)

      sortedIndices.forEach((idx) => {
        const node = nodes[idx]
        if (node.scale < 0.5) return

        const size = 3.5 * node.scale
        ctx.beginPath()
        ctx.arc(node.projectedX, node.projectedY, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${primaryColor} / ${node.opacity})`
        ctx.fill()
      })

      // Activate random connection every 2 seconds
      const now = Date.now()
      if (now - lastActivation > 2000 && connections.length > 0) {
        const randomConn =
          connections[Math.floor(Math.random() * connections.length)]
        randomConn.active = true
        randomConn.progress = 0
        lastActivation = now
      }

      // Animate active connections
      connections.forEach((conn) => {
        if (conn.active) {
          conn.progress += 0.02
          if (conn.progress >= 1) {
            conn.active = false
            conn.progress = 0
          } else {
            const fromNode = nodes[conn.from]
            const toNode = nodes[conn.to]
            const x =
              fromNode.projectedX +
              (toNode.projectedX - fromNode.projectedX) * conn.progress
            const y =
              fromNode.projectedY +
              (toNode.projectedY - fromNode.projectedY) * conn.progress

            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fillStyle = `hsl(${primaryColor} / 0.9)`
            ctx.fill()

            ctx.shadowBlur = 15
            ctx.shadowColor = `hsl(${primaryColor})`
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fillStyle = `hsl(${primaryColor})`
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      // Store old values for potential animation transitions
      const oldRadius = sphereRadius
      // Note: oldCenterX and oldCenterY could be used for smooth transitions
      // const oldCenterX = centerX;
      // const oldCenterY = centerY;

      // Update canvas dimensions
      canvasWidth = canvas.offsetWidth
      canvasHeight = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvasWidth * dpr
      canvas.height = canvasHeight * dpr
      ctx.scale(dpr, dpr)

      // Recalculate center and radius
      centerX = canvasWidth / 2
      centerY = canvasHeight / 2
      sphereRadius = Math.min(canvasWidth, canvasHeight) * 0.35

      // Scale node positions
      const scaleRatio = sphereRadius / oldRadius
      nodes.forEach((node) => {
        node.x *= scaleRatio
        node.y *= scaleRatio
        node.z *= scaleRatio
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={
        fixed
          ? 'fixed inset-0 w-screen h-screen pointer-events-none'
          : 'absolute inset-0 w-full h-full'
      }
    />
  )
}
