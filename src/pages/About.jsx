import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/PageHeader.jsx';

export default function About() {
  return (
    <section className="page">
      <Helmet>
        <title>About | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="About Us"
        title="ErrorFix Pro"
        description="A diagnostic utility suite for Windows BSOD codes, Node.js exceptions, Windows Update errors, and bloatware identification."
      >
        <div className="prose max-w-2xl mt-6" style={{ color: var(--text) }}>
          <h2 className="text-2xl font-bold mb-4">Mission</h2>
          <p>
            ErrorFix Pro aims to provide a single, reliable source for error code lookup,
            system environment detection, and hardware repair guides. Whether you are a
            home user troubleshooting a blue‑screen or a developer debugging a module‑not‑found
            error, our goal is to give you clear, step‑by‑step guidance without jargon.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              Paste or type a terminal output, log excerpt, or system string into the
              <strong>Contribute</strong> or <strong>Scanner</strong> area.
            </li>
            <li>
              Our <strong>systemDetector</strong> parses the input with regex patterns,
              extracts OS, shell, runtime versions, toolchain markers, and error codes,
              and returns a confidence score for each detection.
            </li>
            <li>
              Match the detected code against the <strong>errorDatabase</strong> to retrieve
              summaries, technical causes, diagnostic steps, and recommended fixes.
            </li>
            <li>
              If you have a fix or guide that helped you, use the <strong>Contribute</strong>
              page to submit it. Submitted entries are reviewed and, if accepted, added
              to the public database for everyone to benefit from.
            </li>
          </ol>
          <h2 className="text-2xl font-bold mt-6 mb-4">Contact</h2>
          <p>
            Questions or feedback? Reach out via the project repository's Issues page.
            All contributions are credited, and the database is open‑source under the
            MIT license.
          </p>
          <hr className="my-6 border-yellow-500/20" />
          <p className="text-sm text-muted">
            © 2025 ErrorFix Pro. All rights reserved. • <a href="/compatibility" className="underline hover:underline-opacity-80">Compatibility</a> • <a href="/about" className="underline hover:underline-opacity-80">About</a>
          </p>
        </div>
      </PageHeader>
    </section>
  );
}