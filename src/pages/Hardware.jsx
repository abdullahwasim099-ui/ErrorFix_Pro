import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Screwdriver, Fire, Shield, Memory, Solid, Wifi, } from 'lucide-react';
import { hardwareGuides } from '../data/hardwareGuides.js';
import PageHeader from '../components/PageHeader.jsx';

export default function Hardware() {
  const [selected, setSelected] = useState(hardwareGuides[0]);

  return (
    <section className="page">
      <Helmet>
        <title>Hardware Guides | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="Hardware Guides"
        title="Hardware Guides & Repairs"
        description="Step‑by‑step guides for common hardware upgrades, maintenance, and troubleshooting."
      >
        <div className="grid grid--3" style={{ gap: '1rem', marginTop: '1rem' }}>
          {hardwareGuides.map((guide) => (
            <div
              key={guide.id}
              className={`card card--interactive${guide === selected ? ' border-primary' : ''}`}
              onClick={() => setSelected(guide)}
            >
              <div className="p-4 text-center">
                {/*

                  */}
                <div
                  className="w-12 h-12 rounded-md mx-auto my-3"
                  style={{
                    background: 'rgba(96,165,250,0.15)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/*

                    */}
                  {/*

                    */}
                  {/*

                    */}
                </div>
                <h4 className="text-font-medium line-clamp-2">{guide.title}</h4>
                <p className="text-muted text-xs line-clamp-1">{guide.summary}</p>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-6 prose max-w-none" style={{ color: 'var(--text)' }}>
            <h3 className="text-lg font-medium mb-3">{selected.title}</h3>
            <p className="text-muted mb-4">{selected.summary}</p>
            <details>
              <summary><strong>Difficulty</strong> {selected.difficulty}</summary>
              <p>{selected.time}</p>
            </details>
            <details>
              <summary><strong>Tools needed</strong></summary>
              <ul className="list-disc list-inside">
                {selected.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </details>
            <details>
              <summary><strong>Steps</strong></summary>
              <ol className="list-decimal list-inside">
                {selected.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </details>
          </div>
        )}
      </PageHeader>
    </section>
  );
}