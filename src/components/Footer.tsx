import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="footer-social-pill">
                Discord
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
              <a className="footer-col-link" href="mailto:contact@ethblockchain.ch">
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

        <div className="footer-newsletter">
          <div className="footer-nl-left">
            <h3 className="footer-nl-title">
              Stay in the loop
            </h3>
            <p className="footer-nl-copy">
              Weekly Web3 updates, event invites, and club news.
            </p>
          </div>

          <div className="footer-nl-right">
            <input
              type="email"
              placeholder="your@email.com"
              className="footer-news-input"
            />
            <button type="button" className="footer-news-btn">
              Subscribe →
            </button>
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
