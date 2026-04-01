import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const AccessibilityMode = ({ children }) => {
  const { language } = useLanguage()
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    largeText: false,
    highContrast: false,
    voiceAssist: false,
    simplifiedUI: false,
    elderlyMode: false,
    ashaMode: false
  })

  useEffect(() => {
    // Load saved accessibility preferences
    const saved = localStorage.getItem('accessibilitySettings')
    if (saved) {
      setAccessibilitySettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement
    
    if (accessibilitySettings.largeText) {
      root.style.fontSize = '18px'
    } else {
      root.style.fontSize = '16px'
    }
    
    if (accessibilitySettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Save settings
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings))
  }, [accessibilitySettings])

  const toggleSetting = (setting) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const AccessibilityPanel = () => (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 border-2 border-blue-200 z-40 max-w-xs">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span>♿</span>
        Accessibility Options
      </h3>
      
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accessibilitySettings.largeText}
            onChange={() => toggleSetting('largeText')}
            className="w-4 h-4"
          />
          <span className="text-sm">Large Text</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accessibilitySettings.highContrast}
            onChange={() => toggleSetting('highContrast')}
            className="w-4 h-4"
          />
          <span className="text-sm">High Contrast</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accessibilitySettings.voiceAssist}
            onChange={() => toggleSetting('voiceAssist')}
            className="w-4 h-4"
          />
          <span className="text-sm">Voice Assistance</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accessibilitySettings.elderlyMode}
            onChange={() => toggleSetting('elderlyMode')}
            className="w-4 h-4"
          />
          <span className="text-sm">Elderly Mode</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={accessibilitySettings.ashaMode}
            onChange={() => toggleSetting('ashaMode')}
            className="w-4 h-4"
          />
          <span className="text-sm">ASHA Worker Mode</span>
        </label>
      </div>
    </div>
  )

  // Voice assistance for elderly users
  const speakText = (text) => {
    if (accessibilitySettings.voiceAssist && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN'
      utterance.rate = 0.8 // Slower for elderly
      speechSynthesis.speak(utterance)
    }
  }

  // Enhanced component wrapper with accessibility features
  const EnhancedChildren = () => {
    const className = `
      ${accessibilitySettings.largeText ? 'text-lg' : ''}
      ${accessibilitySettings.highContrast ? 'high-contrast-mode' : ''}
      ${accessibilitySettings.elderlyMode ? 'elderly-mode' : ''}
      ${accessibilitySettings.ashaMode ? 'asha-mode' : ''}
    `.trim()

    return (
      <div className={className}>
        {children}
      </div>
    )
  }

  return (
    <>
      <EnhancedChildren />
      
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setAccessibilitySettings(prev => ({ ...prev, showPanel: !prev.showPanel }))}
        className="fixed top-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50"
        title="Accessibility Options"
      >
        <span className="text-xl">♿</span>
      </button>

      {/* Accessibility Panel */}
      {accessibilitySettings.showPanel && <AccessibilityPanel />}

      {/* ASHA Worker Quick Actions */}
      {accessibilitySettings.ashaMode && (
        <div className="fixed bottom-20 left-4 bg-purple-500 text-white p-4 rounded-lg shadow-lg z-40">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>👩‍⚕️</span>
            ASHA Mode
          </h4>
          <div className="space-y-2">
            <button className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700">
              Multiple Patients
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700">
              Offline Sync
            </button>
            <button className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700">
              Community Report
            </button>
          </div>
        </div>
      )}

      {/* Elderly Mode Helpers */}
      {accessibilitySettings.elderlyMode && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-40">
          <p className="text-sm font-medium mb-2">👴 Elderly Assistance</p>
          <button
            onClick={() => speakText('How can I help you today?')}
            className="bg-green-600 text-white py-1 px-3 rounded text-sm hover:bg-green-700"
          >
            🔊 Speak Instructions
          </button>
        </div>
      )}
    </>
  )
}

export default AccessibilityMode