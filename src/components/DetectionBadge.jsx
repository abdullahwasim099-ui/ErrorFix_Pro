import { useState, useEffect } from 'react';
import { Monitor, Cpu, Terminal, X, HardDrive } from 'lucide-react';

const toneColors = {
  os: 'rgba(94, 173, 220, 0.35)',
  arch: 'rgba(59, 130, 246, 0.35)',
  node: 'rgba(236, 72, 153, 0.35)',
  shell: 'rgba(245, 158, 11, 0.35)',
  error: 'rgba(239, 68, 68, 0.35)',
};

function confidencePct(value) {
  return value ? `${Math.round(value * 100)}%` : '—';
}

export default function DetectionBadge({ detection, onDismiss, showEmpty = true }) {
  if (!detection) {
    return showEmpty
      ? <div className="detection-empty" aria-label="No detection result">
          <span>Paste terminal output to detect your environment</span>
        </div>
      : null;
  }

  const chips = [];
  if (detection.os) {
    chips.push({
      key: 'os',
      label: 'OS',
      value: detection.os.name,
      confidence: detection.os.confidence,
      tone: 'os',
      icon: Monitor,
    });
  }
  if (detection.arch) {
    chips.push({
      key: 'arch',
      label: 'Arch',
      value: detection.arch.name,
      confidence: detection.arch.confidence,
      tone: 'arch',
      icon: HardDrive,
    });
  }
  if (detection.runtimes?.node) {
    chips.push({
      key: 'node',
      label: 'Node',
      value: `v${detection.runtimes.node.version}`,
      confidence: detection.runtimes.node.confidence,
      tone: 'node',
      icon: Cpu,
    });
  }
  if (detection.shell) {
    chips.push({
      key: 'shell',
      label: 'Shell',
      value: detection.shell.name,
      confidence: detection.shell.confidence,
      tone: 'shell',
      icon: Terminal,
    });
  }
  const errorCodes = (detection.errorCodes ?? []).slice().sort((a, b) => b.confidence - a.confidence).slice(0, 3);
  errorCodes.forEach((code, idx) => {
    chips.push({
      key: `error-${code.code}-${idx}`,
      label: idx === 0 ? 'Error Code' : 'Error Code',
      value: code.code,
      confidence: code.confidence,
      tone: 'error',
      icon: X,
    });
  });

  if (!chips.length) {
    return showEmpty
      ? <div className="detection-empty" aria-label="No detected signals">
          <span>No confident signals from the pasted output</span>
        </div>
      : null;
  }

  const [dismissed, setDismissed] = useState([]);

  useEffect(() => setDismissed([]), [detection]);

  const handleDismiss = (key) => {
    setDismissed((prev) => [...new Set(prev), key]);
    onDismiss?.(key);
  };

  return (
    <section className="detection-badge" aria-label="Detected system environment">
      <header className="detection-badge__header">
        <span>Detected environment</span>
        <span>{chips.length} signal{(chips.length !== 1 ? 's' : '')}</span>
      </header>
      <div className="detection-badge__chips">
        {chips.map((chip) => {
          if (dismissed.includes(chip.key)) return null;
          const pct = confidencePct(chip.confidence);
          const color = toneColors[chip.tone];
          return (
            <div
              key={chip.key}
              className="detection-chip"
              style={{ backgroundColor: color }}
              role="button"
              tabIndex={0}
              onClick={() => handleDismiss(chip.key)}
            >
              <chip.icon className="detection-chip__icon" size={14} />
              <span className="detection-chip__label">{chip.label}</span>
              <span className="detection-chip__value">{chip.value}</span>
              <span className="detection-chip__confidence">{pct}</span>
              <button
                type="button"
                className="detection-chip__dismiss"
                aria-label={`Dismiss ${chip.label} ${chip.value}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss(chip.key);
                }}
              >
                <X className="detection-chip__dismiss-icon" size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}