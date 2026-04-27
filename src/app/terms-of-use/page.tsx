import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function TermsOfUsePage() {
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
            <span>Terms</span>
            <span className="outline">of Use</span>
          </h1>
          <p className="legal-date">As of: April 6, 2026</p>
          <p className="hero-subtext legal-hero-subtext">
            The ETH Blockchain Club is a student initiative at ETH Zurich
            dedicated to promoting blockchain technology, Web3, and digital
            innovation. We provide information on our activities, events,
            projects, and educational content on our website.
          </p>
        </section>

        <section className="legal-content">
          <div className="legal-section">
            <p>
              <strong>ETH Blockchain Club</strong>
              <br />
              c/o ETH Zurich
              <br />
              Postfach 58
              <br />
              Rämistrasse 101
              <br />
              8092 Zurich
              <br />
              Email: <a href="mailto:contact@eth-blockchain.org">contact@eth-blockchain.org</a>
            </p>
          </div>

          <div className="legal-section">
            <p>
              The ETH Blockchain Club assumes no liability whatsoever with
              regard to the correctness, accuracy, up-to-dateness, reliability,
              and completeness of the information provided. Liability claims
              regarding damage caused by the use of any information provided,
              including any kind of information which is incomplete or
              incorrect, will therefore be rejected.
            </p>
            <p>
              All offers are non-binding. The ETH Blockchain Club expressly
              reserves the right to change, supplement, delete or temporarily
              or permanently cease publication of parts of the pages or the
              entire website without prior notice.
            </p>
            <p>
              References and links to third-party websites are outside our area
              of responsibility. We decline any responsibility for such
              websites. Access to and use of such websites is at the user's own
              risk.
            </p>
            <p>
              The copyrights and all other rights to the content, images, photos
              or other files on the website belong exclusively to the ETH
              Blockchain Club or the specifically named rights holders. Our
              written consent must be obtained for the reproduction of any
              elements.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Educational Content and Downloads</h2>
            <p>
              The educational content available on the website (for example,
              presentations, texts, and videos) is intended solely for personal,
              non-commercial educational purposes. It does not replace
              professional advice (for example, legal, tax, or financial).
              Distribution, modification, or commercial use is prohibited
              without our written consent.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
