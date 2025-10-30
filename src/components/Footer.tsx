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
                href="mailto:contact@eth-blockchain.org"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
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
                href="https://www.instagram.com/ethbclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
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
                href="https://t.me/+UQYeBnteJoM4MWM0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth"
                aria-label="Telegram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64-2.26.873-4.518 1.746-6.256 2.415-1.737.67-3.045 1.168-3.114 1.192-.46.16-1.082.362-1.61.984-.133.155-.267.354-.335.628s-.038.622.095.895c.265.547.714.773 1.244.976 1.76.564 3.58 1.102 5.087 1.608.556 1.96 1.09 3.927 1.618 5.89.174.394.553.54.944.544l-.002.02s.307.03.606-.042c.3-.07.677-.244 1.02-.565.377-.354 1.4-1.36 1.98-1.928l4.37 3.226.035.02s.484.34 1.192.388c.354.024.82-.044 1.22-.337.403-.294.67-.767.795-1.307.374-1.63 2.853-13.427 3.276-15.38l-.012.046c.296-1.1.187-2.108-.496-2.705-.342-.297-.736-.427-1.13-.444zm-.118 1.874c.027.008.02-.004.027 0 .015 0 .063-.008.056.067l-.063.28s-2.9 13.75-3.276 15.377c-.016.065-.024.027-.04.094-.005.024-.04.047-.06.067-.015.015-.058.008-.103.008l-5.224-3.856-2.44 2.383.48-4.388 8.185-7.615s.8-.746.816-.852c.015-.106-.1-.106-.1-.106-.04 0-.15.04-.272.097-3.645 2.236-7.29 4.472-10.94 6.708-.024.008-.024.008-.063.016l-6.246-1.98c-.054-.02-.054-.02 0-.04 1.855-.705 15.18-5.892 15.18-5.892s.37-.134.654-.134c.094 0 .212.024.318.08z"/>
                </svg>
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
