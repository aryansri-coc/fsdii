import { useState, useEffect } from 'react'

const PLATFORMS = {
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    color: '#1DA1F2',
    colorClass: 'brand-twitter',
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
    colorClass: 'brand-instagram',
    icon: '📸',
    maxChars: 200,
    rules: [
      { id: 'char', text: 'Max 200 characters' }
    ]
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0077B5',
    colorClass: 'brand-linkedin',
    icon: '💼',
    maxChars: 200,
    rules: [
      { id: 'char', text: 'Max 200 characters' }
    ]
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    colorClass: 'brand-facebook',
    icon: '👥',
    maxChars: 200,
    rules: [
      { id: 'char', text: 'Max 200 characters' }
    ]
  }
}

const activeColorClasses = {
  twitter: 'bg-brand-twitter border-brand-twitter text-white shadow-sm',
  instagram: 'bg-brand-instagram border-brand-instagram text-white shadow-sm',
  linkedin: 'bg-brand-linkedin border-brand-linkedin text-white shadow-sm',
  facebook: 'bg-brand-facebook border-brand-facebook text-white shadow-sm'
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
    <div className="max-w-[650px] mx-auto p-6 text-left box-border">
      {/* Header Info */}
      <header className="mb-6 pb-4 border-b-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-tight my-4 -tracking-[1px] text-gray-900 dark:text-gray-100">
          Multi-Platform Post Composer
        </h1>
        <p className="text-[15px] leading-relaxed text-gray-500 dark:text-gray-400 mt-1.5">
          Design and implement a dynamic post creation interface with real-time constraint validation.
        </p>
      </header>

      <div className="block">
        {/* Left Side: Post Composer Controls */}
        <section className="bg-white dark:bg-[#16171d] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md mb-6 flex flex-col">
          <h2 className="text-lg font-medium mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
            Compose Your Post
          </h2>
          
          {/* Platform Selection */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className="block font-semibold text-sm text-gray-900 dark:text-gray-100 m-0">Select Target Platforms:</label>
              <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer text-gray-500 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={singleSelect}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
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
            <div className="flex flex-wrap gap-2.5 mt-2">
              {Object.values(PLATFORMS).map(platform => {
                const isSelected = selectedPlatforms.includes(platform.id)
                return (
                  <button
                    key={platform.id}
                    type="button"
                    className={`inline-flex items-center gap-2 px-3.5 py-2 border rounded-full text-[13px] font-medium cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? activeColorClasses[platform.id]
                        : 'bg-white dark:bg-[#16171d] border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleTogglePlatform(platform.id)}
                  >
                    <span className="text-base">{platform.icon}</span>
                    <span>{platform.name}</span>
                    <span className="font-mono font-bold">
                      {isSelected ? '✓' : '+'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Text Editor Area */}
          <div className="mb-5">
            <label htmlFor="post-textarea" className="block font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">Content Text:</label>
            <textarea
              id="post-textarea"
              placeholder="What would you like to share? Write your post content here..."
              value={text}
              maxLength={activeLimit} // Strict counter stop!
              className="w-full p-3 border rounded-lg bg-white dark:bg-[#16171d] text-gray-900 dark:text-gray-100 text-[15px] leading-relaxed resize-y box-border border-gray-200 dark:border-gray-800 focus:outline-2 focus:outline-purple-500 dark:focus:outline-purple-400 focus:border-transparent"
              onChange={(e) => setText(e.target.value)}
              rows="6"
            />
            {/* Simple character counter directly below textarea */}
            <div className="mt-2 text-xs sm:text-[13px] text-gray-500 dark:text-gray-400">
              Character Limit: <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{text.length} / {activeLimit}</span>
              {text.length >= activeLimit && (
                <span className="text-red-500 font-bold"> (Maximum character limit reached!)</span>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-3">
            {/* Inline Validation Feedback */}
            <div className="flex flex-col gap-2 mb-2">
              {selectedPlatforms.map(pId => {
                const config = PLATFORMS[pId]
                const val = validationStates[pId]
                if (!val || val.isValid) return null
                return (
                  <div key={pId} className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase" style={{ color: config.color }}>
                      {config.icon} {config.name}:
                    </span>
                    <div className="flex flex-col gap-1">
                      {val.errors.map((err, i) => (
                        <div key={`err-${i}`} className="text-[13px] text-red-700 dark:text-red-400">❌ {err}</div>
                      ))}
                      {val.warnings.map((warn, i) => (
                        <div key={`warn-${i}`} className="text-[13px] text-amber-700 dark:text-amber-400">⚠️ {warn}</div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              onClick={handlePublish}
              className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:scale-100`}
              disabled={!isComposerValid || isPublishing}
            >
              {isPublishing ? (
                <>⏳ Simulated Publishing...</>
              ) : (
                <>📤 Publish Post</>
              )}
            </button>
            {!isComposerValid && (
              <p className="text-[13px] text-red-500 m-0">
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
