import { useState } from 'react'

export default function Contribute() {
  const [category, setCategory] = useState('')
  
  // Error Codes state
  const [errorCode, setErrorCode] = useState('')
  const [errorDesc, setErrorDesc] = useState('')
  
  // Bloatware state
  const [bloatName, setBloatName] = useState('')
  const [bloatStatus, setBloatStatus] = useState('Safe to Remove')
  
  // Hardware Guides state
  const [guideTitle, setGuideTitle] = useState('')
  const [guideSteps, setGuideSteps] = useState('')
  
  // Component Categories state
  const [compCategory, setCompCategory] = useState('')

  const [validationError, setValidationError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const validateHexOrNumeric = (code) => {
    // e.g. 0x0000007B or Status Code 102 or just numbers
    const hexRegex = /^0x[0-9a-fA-F]+$/
    const numRegex = /^[0-9]+$/
    const statusRegex = /^Status Code [0-9]+$/i
    return hexRegex.test(code) || numRegex.test(code) || statusRegex.test(code)
  }

  const validateExecutable = (name) => {
    const exeRegex = /^[a-zA-Z0-9_-]+(\.exe)?$/i
    return exeRegex.test(name)
  }

  const validateComponentCat = (cat) => {
    const lettersOnly = /^[a-zA-Z\s]+$/
    return lettersOnly.test(cat)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationError('')
    setSuccessMsg('')

    if (!category) {
      setValidationError('Please select a category.')
      return
    }

    if (category === 'error_codes') {
      if (!validateHexOrNumeric(errorCode)) {
        setValidationError("Error code must be hexadecimal (e.g. 0x0000007B), numeric, or 'Status Code 102'.")
        return
      }
      if (!errorDesc.trim()) {
        setValidationError('Description/fix is required.')
        return
      }
    } else if (category === 'bloatware') {
      if (!validateExecutable(bloatName)) {
        setValidationError("Please enter a valid executable or package name (e.g., 'xtrabuttons.exe' or 'AppUpdater').")
        return
      }
    } else if (category === 'hardware_guides') {
      if (!guideTitle.trim()) {
        setValidationError('Guide title is required.')
        return
      }
      if (!guideSteps.trim()) {
        setValidationError('Troubleshooting instructions are required.')
        return
      }
    } else if (category === 'component_categories') {
      if (!validateComponentCat(compCategory)) {
        setValidationError('Category name must contain only letters and spaces (no symbols or numbers).')
        return
      }
    }

    // Success
    setSuccessMsg('Entry successfully submitted for review. Thank you!')
    
    // Clear form
    setErrorCode('')
    setErrorDesc('')
    setBloatName('')
    setBloatStatus('Safe to Remove')
    setGuideTitle('')
    setGuideSteps('')
    setCompCategory('')
  }

  return (
    <div className="contribute-page">
      <div className="page-header">
        <h1 className="page-title">Expand Our Database</h1>
        <p className="page-subtitle">Submit custom entries to help improve ErrorFix Pro for everyone.</p>
      </div>

      <div className="card contribute-form-card fade-up">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="category-select">Select Category</label>
            <select 
              id="category-select" 
              value={category} 
              onChange={(e) => {
                setCategory(e.target.value)
                setValidationError('')
                setSuccessMsg('')
              }}
              aria-required="true"
            >
              <option value="">-- Choose a category --</option>
              <option value="error_codes">Error Codes Documented</option>
              <option value="bloatware">Bloatware Entries</option>
              <option value="hardware_guides">Hardware Guides</option>
              <option value="component_categories">Component Categories</option>
            </select>
          </div>

          {category === 'error_codes' && (
            <div className="form-section fade-in">
              <div className="form-group">
                <label htmlFor="error-code">Error Code</label>
                <input 
                  type="text" 
                  id="error-code" 
                  value={errorCode}
                  onChange={(e) => setErrorCode(e.target.value)}
                  placeholder="e.g., 0x0000007B or Status Code 102"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="error-desc">Description & Fix</label>
                <textarea 
                  id="error-desc" 
                  rows="4" 
                  value={errorDesc}
                  onChange={(e) => setErrorDesc(e.target.value)}
                  placeholder="Provide a detailed description and steps to fix..."
                  aria-required="true"
                ></textarea>
              </div>
            </div>
          )}

          {category === 'bloatware' && (
            <div className="form-section fade-in">
              <div className="form-group">
                <label htmlFor="bloat-name">Executable / Package Name</label>
                <input 
                  type="text" 
                  id="bloat-name" 
                  value={bloatName}
                  onChange={(e) => setBloatName(e.target.value)}
                  placeholder="e.g., xtrabuttons.exe or AppUpdater"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bloat-status">Status</label>
                <select 
                  id="bloat-status"
                  value={bloatStatus}
                  onChange={(e) => setBloatStatus(e.target.value)}
                  aria-required="true"
                >
                  <option value="Safe to Remove">Safe to Remove</option>
                  <option value="Suspicious">Suspicious</option>
                  <option value="Required">Required</option>
                </select>
              </div>
            </div>
          )}

          {category === 'hardware_guides' && (
            <div className="form-section fade-in">
              <div className="form-group">
                <label htmlFor="guide-title">Guide Title</label>
                <input 
                  type="text" 
                  id="guide-title" 
                  value={guideTitle}
                  onChange={(e) => setGuideTitle(e.target.value)}
                  placeholder="e.g., How to install a new NVMe SSD"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="guide-steps">Troubleshooting Instructions (Step-by-step)</label>
                <textarea 
                  id="guide-steps" 
                  rows="6" 
                  value={guideSteps}
                  onChange={(e) => setGuideSteps(e.target.value)}
                  placeholder="1. Power off PC...&#10;2. Open side panel..."
                  aria-required="true"
                ></textarea>
              </div>
            </div>
          )}

          {category === 'component_categories' && (
            <div className="form-section fade-in">
              <div className="form-group">
                <label htmlFor="comp-category">Category Name</label>
                <input 
                  type="text" 
                  id="comp-category" 
                  value={compCategory}
                  onChange={(e) => setCompCategory(e.target.value)}
                  placeholder="e.g., GPU, Sound Card (letters only)"
                  aria-required="true"
                />
              </div>
            </div>
          )}

          {validationError && (
            <div className="alert alert-error" role="alert" aria-live="assertive">
              {validationError}
            </div>
          )}
          
          {successMsg && (
            <div className="alert alert-success" role="alert" aria-live="polite">
              {successMsg}
            </div>
          )}

          <div style={{ marginTop: 24 }}>
            <button type="submit" className="btn btn-primary" disabled={!category}>
              Submit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
