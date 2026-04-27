import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function PrivacyPolicyPage() {
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
            <span>Privacy</span>
            <span className="outline">Policy</span>
          </h1>
          <p className="legal-date">As of: April 6, 2026</p>
          <p className="hero-subtext legal-hero-subtext">
            This privacy policy explains how the ETH Blockchain Club collects,
            uses, and protects personal data submitted through{" "}
            <a href="https://eth-blockchain.org/" target="_blank" rel="noreferrer">
              https://eth-blockchain.org/
            </a>{" "}
            and other online forms associated with the ETH Blockchain Club. This
            document is based on the Swiss Federal Act on Data Protection (DSG,
            in force since September 1, 2023).
          </p>
        </section>

        <section className="legal-content">
          <div className="legal-section">
            <h2 className="h2">Collected Data</h2>
            <p>Data is collected through website forms, events, or other channels when you provide it.</p>
            <p>The following data may be collected:</p>
            <ul>
              <li>Email address</li>
              <li>Name</li>
              <li>Address</li>
              <li>University and academic department</li>
              <li>Industry and experience</li>
              <li>Mobile number</li>
            </ul>
            <p>Additional data may be collected depending on your role and interaction.</p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Purpose of Data Processing</h2>
            <p>The collected data may be used for:</p>
            <ul>
              <li>Communication</li>
              <li>Application handling</li>
              <li>Spreading information about our events, activities, or mission</li>
            </ul>
            <p>
              The data is processed by committee members of our club. For more
              information about the members processing data, please contact us
              using the details below.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Data Sharing</h2>
            <p>Personal data will not be shared with third parties without explicit consent. Exceptions:</p>
            <ul>
              <li>
                <strong>Supabase:</strong> To keep our data organized, we use
                services provided by Supabase, Inc. (USA). This service is used
                to store and access data securely. Data can only be accessed by
                club members. As Supabase is based in the United States, your
                data may be transferred to and stored in the USA. Supabase
                maintains appropriate safeguards for such transfers. For further
                information, please refer to their privacy policy at{" "}
                <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
                  https://supabase.com/privacy
                </a>.
              </li>
              <li>
                If required by law, legal process, or to protect the Club&apos;s
                legitimate interests.
              </li>
              <li>
                If the data is needed to establish, exercise, or enforce legal
                claims before a court or other competent authority.
              </li>
              <li>
                If disclosure is necessary to protect the life or physical
                integrity of the data subject or a third party, and consent
                cannot be obtained in time.
              </li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="h2">Retention</h2>
            <p>
              Your personal data will be retained as long as necessary to fulfill
              the purposes outlined in this Privacy Policy, unless a longer
              retention period is required or permitted by law.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Your Rights</h2>
            <p>In accordance with the Swiss Federal Act on Data Protection (DSG), you have the right to:</p>
            <ul>
              <li>Request confirmation of whether we hold or process any of your personal data.</li>
              <li>Obtain the identity and contact details of the responsible person within the club.</li>
              <li>Access your personal data.</li>
              <li>Request information about the duration for which we retain your personal data.</li>
              <li>Request the correction of inaccurate personal data.</li>
              <li>Request the deletion of your personal data.</li>
              <li>Request the transfer of your personal data in a commonly used electronic format (data portability), where applicable.</li>
              <li>Restrict or object to processing.</li>
              <li>Lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).</li>
            </ul>
            <p>To exercise your rights, please refer to our contacts below.</p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Cookies and Tracking</h2>
            <p>Our website does not use any cookies or similar tracking technologies.</p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Security</h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data. However, due to the inherent risks of online
              transmission, we cannot guarantee absolute security.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="h2">Contact</h2>
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
