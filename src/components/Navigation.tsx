'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Join Us', path: '/join' },
  { name: 'Collaborate', path: '/collaborate' },
  { name: 'Education', path: '/education' },
  { name: 'News', path: '/news' },
]

export const Navigation = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav
        className="site-nav"
        style={{
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
        }}
      >
        <Link
          href="/"
          className="site-nav-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <Image
            src="/ethbbc3.png"
            alt="ETH Blockchain Club"
            width={72}
            height={54}
            className="site-nav-brand-image"
            style={{ width: '72px', height: '54px', objectFit: 'contain' }}
            priority
          />
        </Link>

        <div
          className="site-nav-links hidden md:flex"
          style={{
            gap: 0,
            listStyle: 'none',
          }}
        >
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

        <div
          className="site-nav-actions"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Link href="/join" className="hero-cta-secondary nav-cta" onClick={() => setMobileMenuOpen(false)}>
            Apply Now
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="nav-mobile-toggle md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="site-mobile-menu"
          style={{
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
          }}
        >
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

      <style>{`
        .nav-link {
          position: relative;
        }

        .site-nav-brand {
          padding: 8px 14px 0px 0;
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

        .nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
        }

        /* Mobile breakpoint follows the site-wide 700px rule used in globals.css. */
        @media (max-width: 700px) {
          .site-nav {
            padding: 0 var(--page-pad-x) !important;
          }

          .site-nav-brand {
            padding: 0 !important;
          }

          .site-nav-brand-image {
            width: 62px !important;
            height: 46px !important;
          }

          .site-nav-actions {
            gap: 8px !important;
          }

          .nav-cta {
            min-height: 44px;
            padding: 10px 14px;
            font-size: 12px;
            letter-spacing: 0.4px;
          }

          .nav-mobile-toggle {
            width: 44px;
            height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            border: 0.5px solid var(--border);
            background: rgba(9, 16, 34, 0.9);
            color: var(--text);
            flex-shrink: 0;
          }

          .site-mobile-menu {
            padding-left: var(--page-pad-x) !important;
            padding-right: var(--page-pad-x) !important;
            background: rgba(13, 20, 36, 0.97) !important;
            backdrop-filter: blur(20px) saturate(180%);
          }
        }
      `}</style>
    </>
  )
}
