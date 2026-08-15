import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icons.jsx'
import { SEO } from '../components/SEO.jsx'
import ImageAnalyzer from '../components/ImageAnalyzer.jsx'

const SCAN_TASKS = [
  'Initializing diagnostic engine...',
  'Analyzing CPU cores and hardware concurrency...',
  'Checking system memory and RAM...',
  'Running JavaScript thread speed benchmark...',
  'Measuring network latency and bandwidth...',
  'Estimating storage quotas and usage...',
  'Finalizing system report...',
]

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState('')
  const [results, setResults] = useState(null)
  const [realTimeSpecs, setRealTimeSpecs] = useState({})

  const handleStartScan = async () => {
    setIsScanning(true)
    setProgress(0)
    setResults(null)
    setRealTimeSpecs({})

    const totalSteps = SCAN_TASKS.length
    const specs = {}
    const issues = []

    const updateProgress = (step, task) => {
      setCurrentTask(task)
      setProgress(Math.round((step / totalSteps) * 100))
    }

    const wait = (ms) => new Promise((res) => setTimeout(res, ms))

    // Step 0: Init
    updateProgress(0, SCAN_TASKS[0])
    await wait(600)

    // Step 1: CPU
    updateProgress(1, SCAN_TASKS[1])
    const cores = navigator.hardwareConcurrency
    if (cores) {
      specs.cores = `${cores} CPU Cores Detected`
      if (cores < 4) {
        issues.push({
          type: 'warning',
          category: 'Hardware',
          title: 'Low CPU Core Count',
          description: `Your system only has ${cores} cores. This may be a performance bottleneck for modern multitasking.`,
        })
      } else {
        issues.push({
          type: 'info',
          category: 'Hardware',
          title: 'Optimal CPU Core Count',
          description: `Your system has ${cores} cores, which is sufficient for modern multitasking.`,
        })
      }
    } else {
      specs.cores = 'CPU Cores: Unknown'
    }
    setRealTimeSpecs({ ...specs })
    await wait(800)

    // Step 2: Memory
    updateProgress(2, SCAN_TASKS[2])
    const memory = navigator.deviceMemory
    if (memory) {
      specs.memory = `Estimated RAM: ${memory} GB`
      if (memory <= 4) {
        issues.push({
          type: 'warning',
          category: 'Hardware',
          title: 'Low System Memory',
          description: `Your system reports ~${memory}GB of RAM. Upgrading RAM is recommended for optimal performance.`,
        })
      } else {
        issues.push({
          type: 'info',
          category: 'Hardware',
          title: 'Sufficient System Memory',
          description: `Your system reports ~${memory}GB of RAM, which is good for most standard tasks.`,
        })
      }
    } else {
      specs.memory = 'RAM: Unknown'
    }
    setRealTimeSpecs({ ...specs })
    await wait(800)

    // Step 3: Benchmark
    updateProgress(3, SCAN_TASKS[3])
    await wait(100) // allow UI to update
    const start = performance.now()
    let dummy = 0
    for (let i = 0; i < 20000000; i++) {
      dummy += Math.random()
    }
    const end = performance.now()
    const benchmarkMs = Math.round(end - start)
    specs.benchmark = `Benchmark score: ${benchmarkMs}ms`
    
    if (benchmarkMs > 500) {
      issues.push({
        type: 'warning',
        category: 'Performance',
        title: 'High JavaScript Execution Time',
        description: `The CPU benchmark took ${benchmarkMs}ms, indicating potential thermal throttling or a slower processor.`,
      })
    } else {
      issues.push({
        type: 'info',
        category: 'Performance',
        title: 'CPU Performance Optimal',
        description: `The benchmark finished in ${benchmarkMs}ms, which is a good processing speed for this environment.`,
      })
    }
    setRealTimeSpecs({ ...specs })
    await wait(800)

    // Step 4: Network
    updateProgress(4, SCAN_TASKS[4])
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (conn) {
      specs.network = `Network: ${conn.effectiveType || 'Unknown'} (Downlink: ${conn.downlink || 0} Mbps, RTT: ${conn.rtt || 0} ms)`
      if (conn.effectiveType === '2g' || conn.effectiveType === '3g' || conn.rtt > 200) {
        issues.push({
          type: 'warning',
          category: 'Network',
          title: 'High Network Latency',
          description: `Detected a slower connection (${conn.effectiveType}, RTT: ${conn.rtt}ms). Online operations may be delayed.`,
        })
      }
    } else {
      specs.network = 'Network: Details unavailable'
    }
    setRealTimeSpecs({ ...specs })
    await wait(800)

    // Step 5: Storage
    updateProgress(5, SCAN_TASKS[5])
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const estimate = await navigator.storage.estimate()
        const usedGB = (estimate.usage / (1024 * 1024 * 1024)).toFixed(2)
        const totalGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(2)
        const percentage = Math.round((estimate.usage / estimate.quota) * 100)
        specs.storage = `Storage Quota: ${usedGB} GB used of ${totalGB} GB (${percentage}%)`

        if (percentage > 90) {
          issues.push({
            type: 'critical',
            category: 'Storage',
            title: 'Storage Quota Almost Full',
            description: `You are using ${percentage}% of your available browser storage quota. Consider clearing cache or freeing up disk space.`,
          })
        }
      } catch (e) {
        specs.storage = 'Storage Quota: Error reading estimate'
      }
    } else {
      specs.storage = 'Storage Quota: Not supported in this browser'
    }
    setRealTimeSpecs({ ...specs })
    await wait(800)

    // Final
    updateProgress(6, SCAN_TASKS[6])
    await wait(800)

    updateProgress(7, 'Done')
    setIsScanning(false)
    setResults(issues)
  }

  const handleDownloadReport = () => {
    if (!results) return

    const reportText = `ErrorFix Pro Diagnostic Report\nDate: ${new Date().toLocaleString()}\n\n--- System Specifications ---\nCPU Cores: ${realTimeSpecs.cores || 'N/A'}\nMemory: ${realTimeSpecs.memory || 'N/A'}\nCPU Benchmark: ${realTimeSpecs.benchmark || 'N/A'}\nNetwork: ${realTimeSpecs.network || 'N/A'}\nStorage: ${realTimeSpecs.storage || 'N/A'}\n\n--- Detected Issues ---\n${results
      .map((r, i) => `${i + 1}. [${r.type.toUpperCase()}] ${r.title}\n   ${r.description}`)
      .join('\n\n')}\n`

    const blob = new Blob([reportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ErrorFixPro-Diagnostic-Report.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fade-up">
      <SEO title="System Diagnostics | ErrorFix Pro" description="Run real-time browser-based diagnostics to analyze CPU, memory, and network performance." canonical="https://errorfixerpro.co.uk/scanner" />
      <div className="page-header">
        <h2 className="page-title">System Diagnostics</h2>
        <p className="page-subtitle">Run a real-time diagnostic check using browser Web APIs to analyze your current system parameters.</p>
      </div>

      <div className="card fade-up">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: 18 }}>Hardware & Network Scan</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 14 }}>
                Identify performance bottlenecks, hardware constraints, and network latency.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={handleStartScan}
                disabled={isScanning}
                style={{ minWidth: 140 }}
              >
                {isScanning ? (
                  <>
                    <Icon.Activity style={{ animation: 'pulse 1.5s infinite' }} aria-hidden="true" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Icon.Search aria-hidden="true" />
                    {results ? 'Scan Again' : 'Start Scan'}
                  </>
                )}
              </button>
            </div>
          </div>
          <ImageAnalyzer />

          {(isScanning || Object.keys(realTimeSpecs).length > 0) && (
            <div style={{ background: 'var(--bg-elev-2)', padding: 20, borderRadius: 'var(--r-md)' }}>
              
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 15, marginBottom: 12, color: 'var(--text)' }}>Real-Time Detected Specs:</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, color: 'var(--text-muted)', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon.Dashboard style={{ width: 16, height: 16, color: realTimeSpecs.cores ? 'var(--primary)' : 'var(--border-soft)' }} />
                    {realTimeSpecs.cores || 'Waiting for CPU scan...'}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon.Database style={{ width: 16, height: 16, color: realTimeSpecs.memory ? 'var(--primary)' : 'var(--border-soft)' }} />
                    {realTimeSpecs.memory || 'Waiting for Memory scan...'}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon.Activity style={{ width: 16, height: 16, color: realTimeSpecs.benchmark ? 'var(--primary)' : 'var(--border-soft)' }} />
                    {realTimeSpecs.benchmark || 'Waiting for Benchmark test...'}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon.Network style={{ width: 16, height: 16, color: realTimeSpecs.network ? 'var(--primary)' : 'var(--border-soft)' }} />
                    {realTimeSpecs.network || 'Waiting for Network check...'}
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon.Save style={{ width: 16, height: 16, color: realTimeSpecs.storage ? 'var(--primary)' : 'var(--border-soft)' }} />
                    {realTimeSpecs.storage || 'Waiting for Storage scan...'}
                  </li>
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{currentTask}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{progress}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--bg-input)', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'var(--primary)',
                    transition: 'width 0.3s ease-out',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {results && !isScanning && (
        <div style={{ marginTop: 32 }} className="fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h3 style={{ margin: 0, fontSize: 20 }}>Scan Results</h3>
              <span className={`badge badge-${results.some(r => r.type === 'warning' || r.type === 'critical') ? 'warning' : 'info'}`}>
                {results.length} Insights Generated
              </span>
            </div>
            
            <button className="btn" style={{ background: 'var(--bg-elev-2)', color: 'var(--text)', border: '1px solid var(--border-soft)' }} onClick={handleDownloadReport}>
              <Icon.Download style={{ width: 16, height: 16 }} />
              Download Diagnostic Report
            </button>
          </div>

          <div className="error-grid">
            {results.map((result, idx) => (
              <div key={idx} className={`error-item fade-up fade-up-${(idx % 4) + 1}`}>
                <div className="error-item-head">
                  <span className={`badge badge-${result.type}`}>{result.type}</span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {result.category}
                  </span>
                  <span className="error-issue">{result.title}</span>
                </div>
                <div className="error-desc" style={{ marginBottom: 16 }}>
                  {result.description}
                </div>
                {result.type === 'warning' && result.category === 'Hardware' && (
                  <Link to="/hardware" style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    View Hardware Guides <Icon.Arrow style={{ width: 14, height: 14, transform: 'rotate(180deg)' }} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
