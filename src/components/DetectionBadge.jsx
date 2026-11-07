import { useState, useEffect } from 'react';
import { Monitor, Cpu, Terminal, X, HardDrive, } from 'lucide-react';

const toneColors = {
  os: 'rgba(94, 173, 220, 0.35)',
  arch: 'rgba(59, 130, 246, 0.35)',
  node: 'rgba(236, 72, 153, 0.35)',
  shell: 'rgba(245, 158, 11, 0.35)',
  error: 'rgba(239, 68, 68, 0.35)',
  vite: 'rgba(34, 197, 94, 0.35)',
  docker: 'rgba(0, 102, 255, 0.35)',
  react: 'rgba(251, 191, 36, 0.35)',
};

function confidencePct(value) {
  return value ? `${Math.round(value * 100)}%` : '—';
}

function getOSInfo(detection) {
  // New shape: detectedOS
  if (detection?.detectedOS) {
    return {
      key: 'os',
      label: 'OS',
      value: detection.detectedOS.name,
      confidence: detection.detectedOS.confidence,
      tone: 'os',
      icon: Monitor,
    };
  }
  // Legacy: os
  if (detection?.os) {
    return {
      key: 'os',
      label: 'OS',
      value: detection.os.name,
      confidence: detection.os.confidence,
      tone: 'os',
      icon: Monitor,
    };
  }
  return null;
}

function getArchInfo(detection) {
  // New shape has no separate arch; legacy has detection.arch
  if (detection?.arch) {
    return {
      key: 'arch',
      label: 'Arch',
      value: detection.arch.name,
      confidence: detection.arch.confidence,
      tone: 'arch',
      icon: HardDrive,
    };
  }
  return null;
}

function getRuntimeInfo(detection) {
  // New shape: detectedRuntime object map { node, python, vite, docker, react }
  const runtimeMap = detection?.detectedRuntime;
  if (!runtimeMap) return null;

  const chips = [];
  if (runtimeMap.node) {
    chips.push({
      key: 'node',
      label: 'Node',
      value: `v${runtimeMap.node.version}`,
      confidence: runtimeMap.node.confidence,
      tone: 'node',
      icon: Cpu,
    });
  }
  if (runtimeMap.python) {
    chips.push({
      key: 'python',
      label: 'Python',
      value: `v${runtimeMap.python.version}`,
      confidence: runtimeMap.python.confidence,
      tone: 'node',
      icon: Cpu,
    });
  }
  if (runtimeMap.vite) {
    chips.push({
      key: 'vite',
      label: 'Vite',
      value: `v${runtimeMap.vite.version}`,
      confidence: runtimeMap.vite.confidence,
      tone: 'vite',
      icon: HardDrive,
    });
  }
  if (runtimeMap.docker) {
    chips.push({
      key: 'docker',
      label: 'Docker',
      value: runtimeMap.docker.version ? `v${runtimeMap.docker.version}` : 'Docker',
      confidence: runtimeMap.docker.confidence,
      tone: 'docker',
      icon: HardDrive,
    });
  }
  if (runtimeMap.react) {
    chips.push({
      key: 'react',
      label: 'React',
      value: runtimeMap.react.version ? `v${runtimeMap.react.version}` : 'React',
      confidence: runtimeMap.react.confidence,
      tone: 'react',
      icon: HardDrive,
    });
  }
  return chips.length > 0 ? chips : null;
}

function getShellInfo(detection) {
  // New shape: detectedShell
  if (detection?.detectedShell) {
    return {
      key: 'shell',
      label: 'Shell',
      value: detection.detectedShell.name,
      confidence: detection.detectedShell.confidence,
      tone: 'shell',
      icon: Terminal,
    };
  }
  // Legacy: shell
  if (detection?.shell) {
    return {
      key: 'shell',
      label: 'Shell',
      value: detection.shell.name,
      confidence: detection.shell.confidence,
      tone: 'shell',
      icon: Terminal,
    };
  }
  return null;
}

function getErrorCodeChips(detection) {
  // New shape: matchedErrorCode (single) + matchedErrorCodes (array)
  // Legacy: detection.errorCodes array
  const codes = (detection?.matchedErrorCodes || [])
    .slice()
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  if (codes.length === 0) return null;

  return codes.map((code, idx) => ({
    key: `error-${code.code}-${idx}`,
    label: idx === 0 ? 'Error Code' : 'Error Code',
    value: code.code,
    confidence: code.confidence,
    tone: 'error',
    icon: X,
  }));
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

  const osChip = getOSInfo(detection);
  if (osChip) chips.push(osChip);

  const archChip = getArchInfo(detection);
  if (archChip) chips.push(archChip);

  const runtimeChips = getRuntimeInfo(detection);
  if (runtimeChips) chips.push(...runtimeChips);

  const shellChip = getShellInfo(detection);
  if (shellChip) chips.push(shellChip);

  const errorChips = getErrorCodeChips(detection);
  if (errorChips) chips.push(...errorChips);

  // If no chips from new shape, try legacy errorCodes fallback
  if (chips.length === 0 && detection?.errorCodes?.length) {
    const legacyCodes = detection.errorCodes.slice().sort((a, b) => b.confidence - a.confidence).slice(0, 3);
    legacyCodes.forEach((code, idx) => {
      chips.push({
        key: `error-${code.code}-${idx}`,
        label: idx === 0 ? 'Error Code' : 'Error Code',
        value: code.code,
        confidence: code.confidence,
        tone: 'error',
        icon: X,
      });
    });
  }

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

  const handleClearAll = () => {
    setDismissed([...chips.map(c => c.key)]);
    onDismiss?.('clear-all');
  };

  return (
    <section className="detection-badge" aria-label="Detected system environment">
      <header className="detection-badge__header">
        <span>Detected environment</span>
        <span>{chips.length} signal{(chips.length !== 1 ? 's' : '')}</span>
        {chips.length > 0 && (
          <button
            className="button button--small button--danger"
            onClick={handleClearAll}
            title="Clear all detected signals"
          >
            Clear all
          </button>
        )}
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