import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M21.8 4.6c.3-.9-.5-1.7-1.4-1.4L3.7 9.5c-1 .4-1 1.8.1 2.1l4.4 1.3 1.7 5.2c.3.8 1.3 1 1.9.4l2.5-2.3 4.4 3.3c.7.5 1.7.1 1.9-.7l1.2-14.2ZM9.6 13.5l8.2-5.2c.2-.1.4.2.2.3l-6.7 6.1-.3 2.9-1.4-4.1Z"
    />
  </svg>
)

const footerCols = {
  club: [
    { label: "About Us", href: "/about" },
    { label: "Committees", href: "/join/committee" },
    { label: "Team", href: "/about" },
    { label: "Join Us", href: "/join" },
    { label: "News", href: "/events" },
  ],
  participate: [
    { label: "Events", href: "/events" },
    { label: "Open Positions", href: "/join" },
    { label: "Collaborate", href: "/collaborate" },
    { label: "Become a Partner", href: "/collaborate" },
  ],
  learn: [
    { label: "Education Hub", href: "/about" },
    { label: "Knowledge Graph", href: "/about" },
    { label: "Resources", href: "/events" },
    { label: "Research", href: "/about" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Code of Ethics", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Impressum", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-line" />

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              src="/ethbcc_logo.png.png"
              alt="ETH Blockchain Club"
              width={94}
              height={94}
              className="footer-brand-logo"
              style={{ width: "94px", height: "94px", objectFit: "contain" }}
            />

            <p className="footer-tagline">
              Building the future of Web3 at ETH Zurich.
            </p>

            <div className="footer-socials">
              <a href="https://www.linkedin.com/company/ethbclub" target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://x.com/ethbclub" target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                X Twitter
              </a>
              <a href="https://t.me/ethbclub" target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                <TelegramIcon /> Telegram
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>

          <div className="footer-nav-cols">
            <div>
              <h4 className="footer-col-title">CLUB</h4>
              {footerCols.club.map((item) => (
                <Link key={item.label} href={item.href} className="footer-col-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="footer-col-title">PARTICIPATE</h4>
              {footerCols.participate.map((item) => (
                <Link key={item.label} href={item.href} className="footer-col-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="footer-col-title">LEARN</h4>
              {footerCols.learn.map((item) => (
                <Link key={item.label} href={item.href} className="footer-col-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="footer-col-title">CONTACT</h4>
              <a className="footer-col-link footer-email-link" href="mailto:contact@ethblockchain.ch">
                <Mail size={14} className="footer-mail-icon" /> contact@ethblockchain.ch
              </a>
              <div className="footer-col-link footer-col-text">
                ETH Zurich, Rämistrasse 101
              </div>
              <div className="footer-col-link footer-col-text">
                8092 Zürich, Switzerland
              </div>
            </div>

            <div>
              <h4 className="footer-col-title">LEGAL</h4>
              {footerCols.legal.map((item) => (
                <a key={item.label} href={item.href} className="footer-col-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copy">
            © 2025 ETH Blockchain Club · All rights reserved
          </p>
          <div className="footer-bottom-links">
            {footerCols.legal.map((item) => (
              <a key={item.label} href={item.href} className="footer-bottom-link">
                {item.label}
              </a>
            ))}
            <span className="footer-bottom-link footer-col-text">
              Made with ♦ in Zürich
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
