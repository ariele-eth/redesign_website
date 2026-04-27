import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function ImpressumPage() {
  return (
    <div className="legal-page min-h-screen">
      <div className="page-grid-bg" />
      <Navigation />

      <main>
        <section className="legal-hero">
          <div className="hero-top-brand">
            <span className="hero-top-line" />
            <span className="hero-top-text">LEGAL</span>
          </div>
          <h1 className="hero-title-main">
            <span>Impressum</span>
          </h1>
        </section>

        <section className="legal-content">
          <div className="legal-section">
            <p>
              <strong>ETH Blockchain Club</strong>
              <br />
              c/o ETH Zürich
              <br />
              Postfach 58
              <br />
              Rämistrasse 101
              <br />
              8092 Zürich
              <br />
              Email: <a href="mailto:contact@eth-blockchain.org">contact@eth-blockchain.org</a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
