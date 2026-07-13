import { useState, useEffect } from 'react'
import './App.css'

const PLATFORMS = {
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    color: '#1DA1F2',
    icon: '🐦',
    maxChars: 280,
    rules: [
      { id: 'char', text: 'Max 280 characters' }
    ]
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    color: '#E1306C',
    icon: '📸',
    maxChars: 2200,
    rules: [
      { id: 'char', text: 'Max 2200 characters' }
    ]
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0077B5',
    icon: '💼',
    maxChars: 3000,
    rules: [
      { id: 'char', text: 'Max 3000 characters' }
    ]
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    icon: '👥',
    maxChars: 10000,
    rules: [
      { id: 'char', text: 'Max 10000 characters' }
    ]
  }
}

function App() {
  const [text, setText] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter'])
  const [isPublishing, setIsPublishing] = useState(false)
  const [validationStates, setValidationStates] = useState({})
  const [singleSelect, setSingleSelect] = useState(true) // Default to single selection mode

  // Determine the strictest active character limit among selected platforms
  const activeLimit = Math.min(
    ...selectedPlatforms.map(pId => PLATFORMS[pId].maxChars)
  )

  // Toggle platform selection
  const handleTogglePlatform = (platformId) => {
    if (singleSelect) {
      setSelectedPlatforms([platformId])
    } else {
      if (selectedPlatforms.includes(platformId)) {
        if (selectedPlatforms.length > 1) {
          setSelectedPlatforms(selectedPlatforms.filter(id => id !== platformId))
        }
      } else {
        setSelectedPlatforms([...selectedPlatforms, platformId])
      }
    }
  }

  // Real-time Validation Engine
  useEffect(() => {
    const newValidation = {}

    selectedPlatforms.forEach(pId => {
      const config = PLATFORMS[pId]
      const charCount = text.length
      const errors = []
      const warnings = []

      // 1. Character limit validation
      if (charCount > config.maxChars) {
        errors.push(`Exceeds maximum limit of ${config.maxChars} characters.`)
      }

      // 2. Empty post check
      if (charCount === 0) {
        errors.push('Post content cannot be completely empty.')
      }

      newValidation[pId] = {
        isValid: errors.length === 0,
        errors,
        warnings
      }
    })

    setValidationStates(newValidation)
  }, [text, selectedPlatforms])

  const isComposerValid = selectedPlatforms.every(pId => validationStates[pId]?.isValid)

  const handlePublish = () => {
    if (!isComposerValid) return
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      setText('')
      alert('Post successfully simulated publishing across selected platforms!')
    }, 1000)
  }

  return (
    <div className="composer-container">
      {/* Header Info */}
      <header className="experiment-header">
        <h1>Multi-Platform Post Composer</h1>
        <p className="experiment-desc">
          Design and implement a dynamic post creation interface with real-time constraint validation.
        </p>
      </header>

      <div className="composer-grid">
        {/* Left Side: Post Composer Controls */}
        <section className="composer-card main-composer">
          <h2>Compose Your Post</h2>
          
          {/* Platform Selection */}
          <div className="platform-select-section">
            <div className="platform-select-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="section-label" style={{ margin: 0 }}>Select Target Platforms:</label>
              <label className="mode-switch-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', color: 'var(--text)' }}>
                <input
                  type="checkbox"
                  checked={singleSelect}
                  onChange={(e) => {
                    const isSingle = e.target.checked
                    setSingleSelect(isSingle)
                    if (isSingle) {
                      // Keep only the first active platform
                      setSelectedPlatforms([selectedPlatforms[0]])
                    }
                  }}
                />
                <span>Single Platform Mode</span>
              </label>
            </div>
            <div className="platform-pills">
              {Object.values(PLATFORMS).map(platform => {
                const isSelected = selectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    type="button"
                    className={`platform-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => handleTogglePlatform(platform.id)}
                    style={{
                      '--platform-color': platform.color,
                      borderColor: isSelected ? platform.color : 'var(--border)'
                    }}
                  >
                    <span className="platform-icon">{platform.icon}</span>
                    <span className="platform-pill-name">{platform.name}</span>
                    <span className="platform-status-indicator">
                      {isSelected ? '✓' : '+'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="input-section">
            <label htmlFor="post-textarea" className="section-label">Content Text:</label>
            <textarea
              id="post-textarea"
              placeholder="What would you like to share? Write your post content here..."
              value={text}
              maxLength={activeLimit} // Strict counter stop!
              onChange={(e) => setText(e.target.value)}
              rows="6"
            />
            {/* Simple character counter directly below textarea */}
            <div className="simple-character-counter">
              Character Limit: <span className="counter-val">{text.length} / {activeLimit}</span>
              {text.length >= activeLimit && (
                <span className="limit-error-msg"> (Maximum character limit reached!)</span>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="composer-footer">
            {/* Inline Validation Feedback */}
            <div className="inline-validation-feedback">
              {selectedPlatforms.map(pId => {
                const config = PLATFORMS[pId]
                const val = validationStates[pId]
                if (!val || val.isValid) return null
                return (
                  <div key={pId} className="inline-platform-rule">
                    <span className="inline-platform-label" style={{ color: config.color }}>
                      {config.icon} {config.name}:
                    </span>
                    <div className="inline-messages">
                      {val.errors.map((err, i) => (
                        <div key={`err-${i}`} className="inline-error-msg">❌ {err}</div>
                      ))}
                      {val.warnings.map((warn, i) => (
                        <div key={`warn-${i}`} className="inline-warning-msg">⚠️ {warn}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handlePublish}
              className={`publish-btn ${!isComposerValid ? 'disabled' : ''}`}
              disabled={!isComposerValid || isPublishing}
            >
              {isPublishing ? (
                <>⏳ Simulated Publishing...</>
              ) : (
                <>📤 Publish Post</>
              )}
            </button>
            {!isComposerValid && (
              <p className="composer-invalid-msg">
                ⚠️ Please resolve platform constraints to publish.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
