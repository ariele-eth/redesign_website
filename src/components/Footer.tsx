import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          {/* Brand */}
          <div className="flex flex-col justify-center space-y-4 md:col-span-2">
            <div className="flex justify-center">
              <img
                src="/ethbcc_logo.png"
                alt="ETHBCC Logo"
                className="h-4 w-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Building the future of decentralized innovation at ETH Zurich.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/collaborate"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Collaborate with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/ETH-Blockchain-Club"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/ethbclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="X (Twitter)"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ethbclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/ethbclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@eth-blockchain.org"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              ETH Zurich
              <br />
              Rämistrasse 101
              <br />
              8092 Zürich, Switzerland
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ETHBLOCKCHAIN CLUB. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
