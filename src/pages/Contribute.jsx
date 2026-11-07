import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Code2, Cpu, HardDrive, CheckCircle2, AlertCircle, } from 'lucide-react';
import { detectSystemInfo } from '../utils/systemDetector.js';
import { getErrorByCode, searchErrors } from '../data/errorDatabase.js';
import DetectionBadge from '../components/DetectionBadge.jsx';
import PageHeader from '../components/PageHeader.jsx';

const CATEGORY_OPTIONS = [
  { id: 'error', label: 'Error Codes', icon: Code2, description: 'Submit a new error code, stop code, or Node.js exception.' },
  { id: 'bloatware', label: 'Bloatware', icon: Cpu, description: 'Submit a bloatware executable, its behaviour, and safe removal steps.' },
  { id: 'hardware', label: 'Hardware Guide', icon: HardDrive, description: 'Submit a hardware upgrade or repair guide with steps and required tools.' },
];

const EMPTY_FORM = {
  code: '',
  title: '',
  description: '',
  technicalCause: '',
  steps: '',
};

export default function Contribute() {
  const [category, setCategory] = useState('error');
  const [rawInput, setRawInput] = useState('');
  const [detection, setDetection] = useState(() => ({
    os: null,
    arch: null,
    runtimes: { node: null, python: null },
    toolchains: [],
    errorCodes: { codes: [], confidences: {} },
  }));
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);
  const autoValuesRef = useRef({});

  // debounced detection
  useEffect(() => {
    const timer = setTimeout(() => setDetection(detectSystemInfo(rawInput)), 520);
    return () => clearTimeout(timer);
  }, [rawInput]);

  // immediate detection on paste
  const handlePaste = (event) => {
    const pasted = event.clipboardData?.getData('text') ?? '';
    if (!pasted) return;
    event.preventDefault();
    const next = rawInput ? `${rawInput}\n${pasted}` : pasted;
    setRawInput(next);
    // also run detection immediately so badge updates right away
    setDetection(detectSystemInfo(next));
  };

  // auto‑prefill when detection confidence >= 0.7
  useEffect(() => {
    const topCode = (detection.errorCodes ?? []).slice().sort((a, b) => b.confidence - a.confidence)[0];
    if (!topCode || topCode.confidence < 0.7) {
      setAutoFilled(false);
      return;
    }
    const known = getErrorByCode(topCode.code) || getErrorByCode(topCode.title ?? '');
    const nextAuto = {
      code: known?.code ?? topCode.code,
      title: known?.title ?? '',
      description:
        known?.summary ?? `Detected ${topCode.code} in the pasted terminal output. Please add a concise description of the issue, the affected application, and any steps already tried.`,
      technicalCause:
        known?.technicalCause ??
        `The pasted output contains ${topCode.code}, which usually indicates a ${topCode.type ?? 'system'} condition. Add the exact command and error context.`,
    };
    // only overwrite a field if it is empty or already matches the last auto‑filled value
    setForm((prev) => {
      const updated = { ...prev };
      for (const key of Object.keys(nextAuto)) {
        const current = prev[key];
        const lastAuto = autoValuesRef.current[key];
        if (!current || current === lastAuto) {
          updated[key] = nextAuto[key];
          autoValuesRef.current[key] = nextAuto[key];
        }
      }
      return updated;
    });
    setAutoFilled(true);
  }, [detection]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // simulate submission; in a real app you would POST to an API
    setTimeout(() => {
      setSubmitted(false);
      setForm(EMPTY_FORM);
      setRawInput('');
      setDetection(() => ({
        os: null,
        arch: null,
        runtimes: { node: null, python: null },
        toolchains: [],
        errorCodes: { codes: [], confidences: {} },
      }));
      setAutoFilled(false);
      autoValuesRef.current = {};
    }, 1500);
  };

  // -----------------------------------------------------------------
  // Category‑specific field labels (kept in sync with the UI)
  // -----------------------------------------------------------------
  const codeLabel =
    category === 'bloatware'
      ? 'Executable name'
      : category === 'hardware'
      ? 'Device or component'
      : 'Error code or stop code';
  const titleLabel = 'Title / Guide title';
  const descLabel = category === 'hardware' ? 'Description of the guide' : 'Description / What should readers know?';
  const techLabel = category === 'hardware' ? 'Root cause / compatibility note' : 'Technical cause';
  const stepsLabel = category === 'hardware' ? 'Steps / reproduction details' : 'Diagnostic steps (comma separated)';

  return (
    <section className="page">
      <Helmet>
        <title>Contribute | ErrorFix Pro</title>
      </Helmet>
      <PageHeader
        eyebrow="Contribute"
        title="Contribute a Fix or Guide"
        description="Help grow the ErrorFix Pro knowledge base by sharing your diagnostics and solutions."
      >
        <form className="form-grid" onSubmit={onSubmit}>
          <input type="hidden" name="category" value={category} />

          <div className="form-field">
            <label>{codeLabel}</label>
            <input
              type="text"
              placeholder="e.g. 0x80070005, ERR_MODULE_NOT_FOUND, xtrabuttons.exe"
              value={form.code}
              onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
            />
          </div>

          <div className="form-field">
            <label>{titleLabel}</label>
            <input
              type="text"
              placeholder="Brief title for the entry"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="form-field">
            <label>{descLabel}</label>
            <textarea
              rows={3}
              placeholder="Describe the issue, what was happening, and any context"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            /></textarea>
          </div>

          <div className="form-field">
            <label>{techLabel}</label>
            <textarea
              rows={3}
              placeholder=" technical cause / root cause"
              value={form.technicalCause}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, technicalCause: e.target.value }))
              }
            /></textarea>
          </div>

          <div className="form-field">
            <label>{stepsLabel}</label>
            <textarea
              rows={3}
              placeholder="List the diagnostic steps or reproduction steps"
              value={form.steps}
              onChange={(e) => setForm((prev) => ({ ...prev, steps: e.target.value }))}
            /></textarea>
          </div>

          <button type="submit" className="button button--primary w-full mt-4">
            {submitted ? 'Submitted!' : 'Contribute'}
          </button>
        </form>
      </PageHeader>

      {/* Detection badge above manual entry fields */}
      <div className="mt-6 p-4 bg-panel rounded" style={{ marginTop: '2rem' }}>
        <h4 className="mb-3">System Detection</h4>
        <p className="text-sm text-muted mb-2">Paste a terminal output snippet below or type to detect your environment:</p>
        <textarea
          className="w-full rounded border p-2 mb-2"
          placeholder="Paste terminal output here..."
          onPaste={handlePaste}
          value={rawInput}
          onInput={(e) => setRawInput(e.target.value)}
        ></textarea>
        <DetectionBadge detection={detection} onDismiss={() => {}} showEmpty={!rawInput} />
        {autoFilled && (
          <p className="text-xs text-success mt-2">
            Auto‑filled code <code>{form.code}</code> and description based on detection confidence >= 0.7.
          </p>
        )}
        {/* Detected error codes list */}
        {detection.errorCodes?.codes?.length > 0 && (
          <div className="mt-3 p-3 bg-panel rounded">
            <h5 className="text-sm font-medium mb-2">Detected error codes</h5>
            <div className="text-xs text-muted">
              {detection.errorCodes.codes.map((code, i) => {
                const c = code.code.toUpperCase();
                const type = code.type === 'bsod' ? 'BSOD' : code.type === 'hresult' ? 'HRESULT' : code.type === 'node' ? 'Node' : 'Generic';
                const confPct = Math.round(code.confidence * 100);
                return (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="code">{c}</span>
                    <span className="text-[var(--muted)] ml-auto">{type}</span>
                    <span className="text-[var(--muted)] ml-2">{confPct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category selector pills */}
      <div className="mt-6 flex gap-2 flex-wrap" style={{ marginTop: '2rem' }}>
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`button button--small${category === opt.id ? ' button--primary' : ''}`}
            onClick={() => setCategory(opt.id)}
          >
            <opt.icon className="mr-1 w-3 h-3" />
            {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
}