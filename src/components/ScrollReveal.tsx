'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  threshold?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 26,
  threshold = 0.18,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const cssVars = {
    '--sr-delay': `${delay}ms`,
    '--sr-distance': `${distance}px`,
  } as const satisfies Record<string, string>

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -6% 0px',
      }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, threshold])

  return (
    <div
      ref={ref}
      className={`scroll-reveal${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={cssVars as CSSProperties}
    >
      {children}
    </div>
  )
}
