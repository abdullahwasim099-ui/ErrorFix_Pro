export function detectOS(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  const rules = {
    Windows: [
      { pattern: /Microsoft Windows/i, weight: 0.9, evidence: 'Microsoft Windows' },
      { pattern: /Windows 11/i, weight: 0.95, evidence: 'Windows 11' },
      { pattern: /Windows 10/i, weight: 0.95, evidence: 'Windows 10' },
      { pattern: /build\s+22\d{3}/i, weight: 0.8, evidence: 'Windows 11 build' },
      { pattern: /build\s+10240|NT 10\.0/i, weight: 0.8, evidence: 'Windows 10 build' },
      { pattern: /(?:^|\s)[A-Z]:\\/m, weight: 0.75, evidence: 'drive letter C:\\' },
      { pattern: /\bwin32\b/i, weight: 0.8, evidence: 'win32 platform' },
      { pattern: /\\Program Files\\/i, weight: 0.8, evidence: 'Program Files' },
      { pattern: /\bWINDIR\b/i, weight: 0.75, evidence: 'WINDIR env' },
      { pattern: /\bcmd\.exe\b/i, weight: 0.7, evidence: 'cmd.exe' },
    ],
    macOS: [
      { pattern: /\bDarwin\b/, weight: 0.9, evidence: 'Darwin kernel' },
      { pattern: /\bmacOS\b/i, weight: 0.9, evidence: 'macOS label' },
      { pattern: /\/Users\/[^/\s]+/i, weight: 0.7, evidence: '/Users/ path' },
      { pattern: /\\.app\\/Contents/i, weight: 0.85, evidence: '.app/Contents' },
      { pattern: /\bHomebrew\b/i, weight: 0.8, evidence: 'Homebrew' },
      { pattern: /\bApple M[0-9]\b/i, weight: 0.85, evidence: 'Apple M‑series chip' },
    ],
    Linux: [
      { pattern: /\bLinux\b/i, weight: 0.85, evidence: 'Linux kernel' },
      { pattern: /\bUbuntu\b/i, weight: 0.9, evidence: 'Ubuntu' },
      { pattern: /\bDebian\b/i, weight: 0.9, evidence: 'Debian' },
      { pattern: /\bFedora\b/i, weight: 0.9, evidence: 'Fedora' },
      { pattern: /\bArch Linux\b/i, weight: 0.9, evidence: 'Arch Linux' },
      { pattern: /\\etc\\/os-release/i, weight: 0.8, evidence: '/etc/os-release' },
      { pattern: /\bsystemd\b/i, weight: 0.7, evidence: 'systemd' },
      { pattern: /\b(?:apt|dnf|yum|pacman)\b/i, weight: 0.6, evidence: 'package manager' },
      { pattern: /\buname\b/i, weight: 0.5, evidence: 'uname output' },
    ],
  };

  let best = { name: null, confidence: 0, evidence: [] };
  for (const [osName, ruleList] of Object.entries(rules)) {
    let score = 0;
    const ev = [];
    for (const rule of ruleList) {
      if (rule.pattern.test(s)) {
        score += rule.weight;
        ev.push(rule.evidence);
      }
    }
    const distinct = new Set(ev).size;
    if (distinct > 1) score += 0.1 * (distinct - 1);
    if (score > best.confidence) {
      best = { name: osName, confidence: Math.min(1.0, score), evidence: ev.slice(0, 4) };
    }
  }
  if (best.confidence < 0.3) return null;
  const versionMatch = s.match(/\b(?:Version\s+(\S+)|(\d+\.\d+\.\d+))/i);
  return {
    name: best.name,
    confidence: best.confidence,
    evidence: best.evidence,
    version: versionMatch ? versionMatch[1] || versionMatch[2] : null,
  };
}

export function detectShell(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  const rules = [
    { name: 'PowerShell', pattern: /(?:^|\n)\s*PS\s+[A-Z]:\\/m, weight: 0.9, evidence: 'PS C:\\ prompt' },
    { name: 'PowerShell', pattern: /(?:^|\n)\s*PS\s+\>/m, weight: 0.9, evidence: 'PS prompt >' },
    { name: 'PowerShell', pattern: /Windows PowerShell|pwsh/i, weight: 0.9, evidence: 'PowerShell branding' },
    { name: 'CMD', pattern: /(?:^|\n)[A-Z]:\\>[^\\n]*/m, weight: 0.85, evidence: 'C:\\>' prompt },
    { name: 'CMD', pattern: /\[Version\s+\d+\.\d+\.\d+\]/i, weight: 0.9, evidence: 'Windows Version banner' },
    { name: 'Bash', pattern: /^#!\\/bin\\/(ba)?sh/m, weight: 0.95, evidence: 'shebang bash' },
    { name: 'Bash', pattern: /^\$\\s/m, weight: 0.6, evidence: '$ prompt' },
    { name: 'Bash', pattern: /\\bsudo\\s/i, weight: 0.6, evidence: 'sudo' },
    { name: 'Zsh', pattern: /^#!\\/bin\\/zsh/m, weight: 0.95, evidence: 'shebang zsh' },
    { name: 'Zsh', pattern: /%\\~/m, weight: 0.55, evidence: '~ prompt' },
  ];

  let best = { name: null, confidence: 0, evidence: [] };
  for (const rule of rules) {
    if (rule.pattern.test(s)) {
      const score = rule.weight;
      if (score > best.confidence) {
        best = { name: rule.name, confidence: Math.min(1.0, score), evidence: [rule.evidence] };
      }
    }
  }
  if (best.confidence < 0.3) return null;
  return best;
}

export function detectRuntimes(text) {
  if (typeof text !== 'string') return { node: null, python: null, vite: null, docker: null, react: null };
  const s = text;
  const nodeResult = { version: null, confidence: 0, evidence: [] };
  const pythonResult = { version: null, confidence: 0, evidence: [] };
  const viteResult = { version: null, confidence: 0, evidence: [] };
  const dockerResult = { version: null, confidence: 0, evidence: [] };
  const reactResult = { version: null, confidence: 0, evidence: [] };

  // Node.js
  const nodePat = /(?:Node\.js\s+v?|node\s+v?)(\d+\.\d+\.\d+)/i;
  const nodeMatch = s.match(nodePat);
  if (nodeMatch) {
    nodeResult.version = nodeMatch[1];
    nodeResult.confidence = 0.95;
    nodeResult.evidence.push(`Node.js ${nodeMatch[0]}`);
  } else {
    const barePat = /^(v\d+\.\d+\.\d+)/m;
    const bareMatch = s.match(barePat);
    if (bareMatch) {
      nodeResult.version = bareMatch[1];
      nodeResult.confidence = 0.7;
      nodeResult.evidence.push(`bare ${bareMatch[0]}`);
    }
  }

  // Python
  const pythonPat = /Python\s+(\d+\.\d+\.\d+)/i;
  const pythonMatch = s.match(pythonPat);
  if (pythonMatch) {
    pythonResult.version = pythonMatch[1];
    pythonResult.confidence = 0.95;
    pythonResult.evidence.push(`Python ${pythonMatch[0]}`);
  }

  // Vite
  const vitePat = /\bvite\b/i;
  if (vitePat.test(s)) {
    const viteVerPat = /VITE\s+v?(\d+\.\d+\.\d+)/i;
    const viteVerMatch = s.match(viteVerPat);
    if (viteVerMatch) {
      viteResult.version = viteVerMatch[1];
      viteResult.confidence = 0.95;
      viteResult.evidence.push(`VITE ${viteVerMatch[0]}`);
    } else {
      viteResult.confidence = 0.7;
      viteResult.evidence.push('vite keyword');
    }
  }

  // Docker
  const dockerPat = /\bdocker\b/i;
  if (dockerPat.test(s)) {
    const dockerVerPat = /Docker\s+version\s+(\d+\.\d+\.\d+)/i;
    const dockerVerMatch = s.match(dockerVerPat);
    if (dockerVerMatch) {
      dockerResult.version = dockerVerMatch[1];
      dockerResult.confidence = 0.95;
      dockerResult.evidence.push(`Docker ${dockerVerMatch[0]}`);
    } else {
      dockerResult.confidence = 0.7;
      dockerResult.evidence.push('docker keyword');
    }
  }

  // React
  const reactPat = /react@?(\d+\.\d+\.\d+)/i;
  const reactMatch = s.match(reactPat);
  if (reactMatch) {
    reactResult.version = reactMatch[1];
    reactResult.confidence = 0.9;
    reactResult.evidence.push(`react@${reactMatch[0]}`);
  } else {
    const reactKWPat = /\b(useState|useEffect|createRoot|ReactDOM)\b/i;
    if (reactKWPat.test(s)) {
      reactResult.confidence = 0.5;
      reactResult.evidence.push('React keyword');
    }
  }

  return {
    node: nodeResult.confidence > 0 ? nodeResult : null,
    python: pythonResult.confidence > 0 ? pythonResult : null,
    vite: viteResult.confidence > 0 ? viteResult : null,
    docker: dockerResult.confidence > 0 ? dockerResult : null,
    react: reactResult.confidence > 0 ? reactResult : null,
  };
}

export function detectArch(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  const macArmPat = /\bApple M[0-9]\b/i;
  const macIntelPat = /\bIntel Core\b/i;
  if (macArmPat.test(s)) return { name: 'arm64', confidence: 0.95 };
  if (macIntelPat.test(s)) return { name: 'x64', confidence: 0.9 };

  const x64Pat = /\b(?:x64|AMD64|win32[_\s-]?x64|WOW64)\b/i;
  const arm64Pat = /\b(?:arm64|aarch64|win32[_\s-]?arm64)\b/i;
  const x86Pat = /\b(?:x86|i386|i686)\b/i;

  let best = { name: null, confidence: 0 };
  if (x64Pat.test(s)) best = { name: 'x64', confidence: 0.85 };
  if (arm64Pat.test(s) && (!best.name || best.confidence < 0.9)) best = { name: 'arm64', confidence: 0.9 };
  if (x86Pat.test(s) && (!best.name || best.confidence < 0.7)) best = { name: 'x86', confidence: 0.7 };
  if (!best.name) return null;
  return best;
}

export function detectToolchains(text) {
  if (typeof text !== 'string') return [];
  const s = text;
  const rules = [
    { name: 'Vite', pattern: /\bvite\b/i, weight: 0.75, evidence: 'vite keyword' },
    { name: 'Vite', pattern: /VITE\s+v?\d+\.\d+\.\d+/i, weight: 0.95, evidence: 'VITE version' },
    { name: 'Vite', pattern: /localhost:5173/, weight: 0.85, evidence: 'localhost:5173' },
    { name: 'Vite', pattern: /@vitejs\\/plugin-react/i, weight: 0.9, evidence: '@vitejs/plugin-react' },
    { name: 'Docker', pattern: /\bdocker\b/i, weight: 0.75, evidence: 'docker keyword' },
    { name: 'Docker', pattern: /Docker\s+version\s+\d+\.\d+\.\d+/i, weight: 0.95, evidence: 'Docker version' },
    { name: 'Docker', pattern: /docker-compose/i, weight: 0.85, evidence: 'docker-compose' },
    { name: 'Docker', pattern: /Dockerfile/i, weight: 0.8, evidence: 'Dockerfile' },
    { name: 'React', pattern: /\breact\b/i, weight: 0.6, evidence: 'react keyword' },
    { name: 'React', pattern: /react@?\d+\.\d+\.\d+/i, weight: 0.8, evidence: 'react version' },
  ];

  const seen = new Map();
  for (const rule of rules) {
    if (rule.pattern.test(s)) {
      const entry = seen.get(rule.name);
      const newConf = entry ? Math.max(entry.confidence, rule.weight) : rule.weight;
      seen.set(rule.name, { name: rule.name, confidence: newConf, evidence: entry ? [...entry.evidence, rule.evidence] : [rule.evidence] });
    }
  }
  return Array.from(seen.values()).map((t) => ({ name: t.name, confidence: Math.min(1.0, t.confidence), evidence: t.evidence.slice(0, 3) }));
}

// Known BSOD stop-code keywords (all-caps, typically 2+ underscore-separated tokens)
const BSOD_PATTERN = /\b[A-Z][A-Z0-9_]+\b/g;

// Known Node-style exception signatures
const NODE_PAT = /\b(ERR_[A-Z0-9_]+|EADDRINUSE|ENOENT|ECONNREFUSED|EACCES|EPERM|ETIMEDOUT)\b/gi;

// Known Python exception names
const PY_PAT = /\b([A-Z][a-z]+(?:Error|Exception))\b/gi;

// Known .NET exception names
const DOTNET_PAT = /\bsystem\.\\w+\\.Exception\\b/gi;

// Known Java exception names
const JAVA_PAT = /\bjava\.lang\.\w+Exception\b/gi;

export function detectErrorCodes(text) {
  if (typeof text !== 'string') return { codes: [], confidences: {} };
  const s = text;
  const results = new Map();

  // 0x + hex digits (3 to 16 hex chars, normalized to 8 where appropriate)
  const hex8Pat = /0x[0-9A-Fa-f]{4,16}/gi;
  let m;
  while ((m = hex8Pat.exec(s)) !== null) {
    const code = m[0].toUpperCase();
    let type = 'generic';
    let base = 0.72;
    const ctx = s.substring(Math.max(0, m.index - 80), m.index + 80);
    if (/STOP|BSOD|bugcheck/i.test(ctx)) { type = 'bsod'; base += 0.15; }
    if (/0x8/i.test(code)) { type = 'hresult'; base += 0.1; }
    let conf = Math.min(1.0, base);
    if (!results.has(code)) {
      results.set(code, { confidence: conf, type, evidence: [m[0]] });
    } else {
      const existing = results.get(code);
      if (conf > existing.confidence) {
        results.set(code, { confidence: conf, type, evidence: [...new Set([...existing.evidence, m[0]])] });
      }
    }
  }

  // Node-style ERR_* / E* codes
  let nm;
  while ((nm = NODE_PAT.exec(s)) !== null) {
    const code = nm[0].toUpperCase();
    const existing = results.get(code);
    const conf = existing ? Math.max(existing.confidence, 0.85) : 0.85;
    if (!existing || conf > existing.confidence) {
      results.set(code, { confidence: conf, type: 'node', evidence: [...(existing ? existing.evidence : []), nm[0]] });
    }
  }

  // Python-style *Error/*Exception
  let pm;
  while ((pm = PY_PAT.exec(s)) !== null) {
    const code = pm[0].toUpperCase();
    const existing = results.get(code);
    const conf = existing ? Math.max(existing.confidence, 0.8) : 0.8;
    if (!existing || conf > existing.confidence) {
      results.set(code, { confidence: conf, type: 'python', evidence: [...(existing ? existing.evidence : []), pm[0]] });
    }
  }

  // Deduplicate and return array sorted by confidence desc
  const arr = Array.from(results.values()).sort((a, b) => b.confidence - a.confidence);
  const deduped = [];
  const seenCodes = new Set();
  for (const item of arr) {
    if (!seenCodes.has(item.code)) {
      seenCodes.add(item.code);
      deduped.push({ code: item.code, type: item.type, confidence: item.confidence, evidence: item.evidence });
    }
  }
  const confidences = {};
  deduped.forEach(c => confidences[c.code] = c.confidence);
  return { codes: deduped, confidences };
}

export function detectSystemInfo(input) {
  if (typeof input === 'string') {
    const text = input;
    const os = detectOS(text);
    const shell = detectShell(text);
    const arch = detectArch(text);
    const runtimes = detectRuntimes(text);
    const toolchains = detectToolchains(text);
    const errorCodes = detectErrorCodes(text);

    // Compute aggregate confidenceScore
    const signals = [];
    if (os) signals.push(os.confidence * 0.30);
    if (shell) signals.push(shell.confidence * 0.15);
    const bestRuntime = runtimes.node || runtimes.python || runtimes.vite || runtimes.docker || runtimes.react;
    if (bestRuntime) signals.push(bestRuntime.confidence * 0.20);
    const topCode = (errorCodes.codes && errorCodes.codes.length > 0) ? errorCodes.codes[0] : null;
    if (topCode) signals.push(topCode.confidence * 0.35);
    const confidenceScore = signals.length > 0
      ? Math.min(1.0, Number((signals.reduce((a, b) => a + b, 0) / signals.length).toFixed(2)))
      : 0;

    return {
      // Required new keys
      detectedOS: os ? {
        name: os.name,
        version: os.version,
        confidence: os.confidence,
        evidence: os.evidence,
      } : null,
      detectedShell: shell ? { name: shell.name, confidence: shell.confidence, evidence: shell.evidence } : null,
      detectedRuntime: runtimes,
      matchedErrorCode: topCode || null,
      matchedErrorCodes: errorCodes.codes,
      confidenceScore,

      // Legacy keys (for DetectionBadge / Contribute / Scanner / Dashboard)
      os: os ? { name: os.name, confidence: os.confidence, version: os.version, evidence: os.evidence } : null,
      shell: shell || null,
      arch: arch || null,
      runtimes,
      toolchains,
      errorCodes: { codes: errorCodes.codes, confidences: errorCodes.confidences },
    };
  }
  if (Array.isArray(input)) {
    const joined = input.join('\n');
    return detectSystemInfo(joined);
  }
  return {
    detectedOS: null, detectedShell: null, detectedRuntime: {},
    matchedErrorCode: null, matchedErrorCodes: [],
    confidenceScore: 0,
    // legacy
    os: null, shell: null, arch: null,
    runtimes: { node: null, python: null }, toolchains: [],
    errorCodes: { codes: [], confidences: {} },
  };
}