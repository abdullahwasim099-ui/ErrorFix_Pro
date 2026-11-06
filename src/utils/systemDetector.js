export function detectOS(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  const rules = {
    Windows: [
      { pattern: /Microsoft Windows/i, weight: 0.9, evidence: 'Microsoft Windows' },
      { pattern: /Windows PowerShell/i, weight: 0.9, evidence: 'Windows PowerShell' },
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
      { pattern: /\bApple M[0-9]/i, weight: 0.85, evidence: 'Apple M‑series chip' },
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
    // add bonus for multiple distinct markers
    const distinct = new Set(ev).size;
    if (distinct > 1) score += 0.1 * (distinct - 1);
    if (score > best.confidence) {
      best = { name: osName, confidence: Math.min(1.0, score), evidence: ev.slice(0, 4) };
    }
  }
  if (best.confidence < 0.3) return null;
  return best;
}

export function detectShell(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  const rules = [
    { name: 'PowerShell', pattern: /(?:^|\n)\s*PS\s+[A-Z]:\\/m, weight: 0.9, evidence: 'PS C:\\ prompt' },
    { name: 'PowerShell', pattern: /Windows PowerShell|pwsh|>\\s*PS\s+/i, weight: 0.9, evidence: 'PowerShell branding' },
    { name: 'CMD', pattern: /(?:^|\n)[A-Z]:\\>[^\\n]*/m, weight: 0.85, evidence: 'C:\\>' prompt },
    { name: 'CMD', pattern: /Microsoft Windows \[Version/i, weight: 0.9, evidence: 'Windows Version banner' },
    { name: 'Bash', pattern: /^#!\\/bin\\/(ba)?sh/m, weight: 0.95, evidence: 'shebang bash' },
    { name: 'Bash', pattern: /bash|zsh|sh$/m, weight: 0.7, evidence: 'shell name' },
    { name: 'Bash', pattern: /^\\$\\s/m, weight: 0.55, evidence: '$ prompt' },
    { name: 'Bash', pattern: /\\bsudo\\s/i, weight: 0.6, evidence: 'sudo' },
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
  if (typeof text !== 'string') return { node: null, python: null };
  const s = text;
  const nodeResult = { version: null, confidence: 0, evidence: [] };
  const pythonResult = { version: null, confidence: 0, evidence: [] };

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

  return { node: nodeResult.confidence > 0 ? nodeResult : null, python: pythonResult.confidence > 0 ? pythonResult : null };
}

export function detectArch(text) {
  if (typeof text !== 'string') return null;
  const s = text;
  // Windows x64 markers
  const x64Pat = /\b(?:x64|AMD64|win32[_\s-]?x64|WOW64)\b/i;
  // ARM64 markers
  const arm64Pat = /\b(?:arm64|aarch64|win32[_\s-]?arm64)\b/i;
  // x86 markers (avoid win32 alone)
  const x86Pat = /\b(?:x86|i386|i686)\b/i;
  // macOS arm64 vs intel
  const macArmPat = /\bApple M[0-9]\b/i;
  const macIntelPat = /\bIntel Core\b/i;

  if (macArmPat.test(s)) return { name: 'arm64', confidence: 0.95 };
  if (macIntelPat.test(s)) return { name: 'x64', confidence: 0.9 };

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
    { name: 'Docker', pattern: /\\bcontainer\\b/i, weight: 0.55, evidence: 'container' },
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

export function detectErrorCodes(text) {
  if (typeof text !== 'string') return { codes: [], confidences: {} };
  const s = text;
  const results = new Map(); // code -> { confidence, type, evidence }

  // 0x + 8 hex digits
  const hex8Pat = /0x[0-9A-Fa-f]{8}/gi;
  let m;
  while ((m = hex8Pat.exec(s)) !== null) {
    const code = m[0].toUpperCase();
    let type = 'generic';
    let base = 0.72;
    // context boost
    const ctx = s.substring(Math.max(0, m.index - 80), m.index + 80);
    if (/STOP|BSOD|bugcheck/i.test(ctx)) { type = 'bsod'; base += 0.15; }
    if (/0x8/i.test(code)) { type = 'hresult'; base += 0.1; }
    // known code boost from database later optional; we skip here
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

  // Node-style ERR_* codes
  const nodePat = /\b(ERR_[A-Z0-9_]+|EADDRINUSE|ENOENT|ECONNREFUSED|EACCES|EPERM|ETIMEDOUT)\b/gi;
  let nm;
  while ((nm = nodePat.exec(s)) !== null) {
    const code = nm[0].toUpperCase();
    const existing = results.get(code);
    const conf = existing ? Math.max(existing.confidence, 0.85) : 0.85;
    if (!existing || conf > existing.confidence) {
      results.set(code, { confidence: conf, type: 'node', evidence: [...(existing ? existing.evidence : []), nm[0]] });
    }
  }

  // deduplicate and return array sorted by confidence desc
  const arr = Array.from(results.values()).sort((a, b) => b.confidence - a.confidence);
  const deduped = [];
  const seenCodes = new Set();
  for (const item of arr) {
    if (!seenCodes.has(item.code)) {
      seenCodes.add(item.code);
      deduped.push({ code: item.code, type: item.type, confidence: item.confidence, evidence: item.evidence });
    }
  }
  return { codes: deduped, confidences: deduped.reduce((acc, c) => { acc[c.code] = c.confidence; return acc; }, {}) };
}

export function detectSystemInfo(input) {
  if (typeof input === 'string') {
    const text = input;
    return {
      os: detectOS(text),
      shell: detectShell(text),
      arch: detectArch(text),
      runtimes: detectRuntimes(text),
      toolchains: detectToolchains(text),
      errorCodes: detectErrorCodes(text),
    };
  }
  if (Array.isArray(input)) {
    const joined = input.join('\n');
    return detectSystemInfo(joined);
  }
  return { os: null, shell: null, arch: null, runtimes: { node: null, python: null }, toolchains: [], errorCodes: { codes: [], confidences: {} } };
}