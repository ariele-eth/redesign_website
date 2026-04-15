'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Join Us', path: '/join' },
  { name: 'Collaborate', path: '/collaborate' },
  { name: 'Education', path: '/about' },
  { name: 'News', path: '/events' },
]

export const Navigation = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        height: '60px',
        background: 'rgba(4, 6, 15, 0.7)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '0.5px solid rgba(99, 130, 255, 0.1)',
      }}>
        {/* Brand */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
        }}>
          <Image
            src="/ethbcc_logo.png.png"
            alt="ETH Blockchain Club"
            width={90}
            height={58}
            style={{ width: '90px', height: '58px', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          gap: 0,
          listStyle: 'none',
        }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.path}-${link.name}`}
              href={link.path}
              className="nav-link"
              style={{
                color: isActive(link.path) ? 'var(--text)' : 'var(--muted)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.3px',
                padding: '0 14px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <Link
            href="/join"
            className="nav-cta"
            style={{
              background: 'transparent',
              color: 'var(--button)',
              border: '0.5px solid var(--button)',
              borderRadius: 'var(--r)',
              padding: '7px 18px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: '0.3px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Apply Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              fontSize: '20px',
            }}
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: '60px',
          left: 0,
          right: 0,
          zIndex: 150,
          background: 'var(--surface)',
          borderBottom: '0.5px solid var(--border)',
          padding: '16px 20px',
          gap: '8px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={`${link.path}-${link.name}`}
              href={link.path}
              style={{
                color: isActive(link.path) ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                fontSize: '14px',
                padding: '12px 16px',
                borderRadius: 'var(--r)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                display: 'block',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}

      {/* CSS for nav link underline animation */}
      <style>{`
        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 14px;
          right: 14px;
          height: 1.5px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .nav-cta:hover {
          background: var(--button);
          color: #fff;
        }
      `}</style>
    </>
  )
}
