import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const SymptomInput = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [voiceText, setVoiceText] = useState('')

  const symptoms = [
    { id: 'fever', label: t('fever'), icon: '🤒' },
    { id: 'cough', label: t('cough'), icon: '😷' },
    { id: 'headache', label: t('headache'), icon: '🤕' },
    { id: 'weakness', label: t('weakness'), icon: '😴' },
    { id: 'stomachPain', label: t('stomachPain'), icon: '🤢' },
    { id: 'bodyAche', label: 'Body Ache', icon: '💪' },
    { id: 'nausea', label: 'Nausea', icon: '🤮' },
    { id: 'dizziness', label: 'Dizziness', icon: '😵' }
  ]

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'en-IN' // Indian English
      recognition.continuous = false
      recognition.interimResults = false

      setIsListening(true)
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase()
        setVoiceText(transcript)
        setAdditionalInfo(prev => prev + ' ' + transcript)
        
        // Auto-detect symptoms from voice
        symptoms.forEach(symptom => {
          if (transcript.includes(symptom.label.toLowerCase()) || 
              transcript.includes(symptom.id)) {
            if (!selectedSymptoms.includes(symptom.id)) {
              setSelectedSymptoms(prev => [...prev, symptom.id])
            }
          }
        })
        
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        alert('Voice recognition not available. Please type your symptoms.')
      }

      recognition.start()
    } else {
      alert('Voice recognition not supported in this browser')
    }
  }

  const handleAnalyze = () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom')
      return
    }
    
    // Store symptoms in sessionStorage for the result page
    sessionStorage.setItem('symptoms', JSON.stringify({
      selected: selectedSymptoms,
      additional: additionalInfo,
      voice: voiceText
    }))
    
    navigate('/result')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-2xl"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                🩺 {t('appName')}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-2 bg-primary rounded"></div>
                <div className="w-8 h-2 bg-gray-200 rounded"></div>
                <div className="w-8 h-2 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-500 ml-2">Step 1 of 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('selectSymptoms')}
            </h2>
            <p className="text-gray-600">
              Select all symptoms you are experiencing
            </p>
          </div>

          {/* Voice Input Section */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 border-2 border-dashed border-primary">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">🎤</span>
                Speak Your Symptoms
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Perfect for elderly users • Works in local language
              </p>
              <button
                onClick={startVoiceInput}
                disabled={isListening}
                className={`btn-large ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                <span className="text-2xl">{isListening ? '🔴' : '🎤'}</span>
                {isListening ? 'Listening...' : 'Tap to Speak'}
              </button>
              {voiceText && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <p className="text-sm text-gray-700">
                    <strong>You said:</strong> "{voiceText}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Symptom Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {symptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`symptom-card ${
                  selectedSymptoms.includes(symptom.id) ? 'selected' : ''
                }`}
              >
                <div className="text-3xl mb-2">{symptom.icon}</div>
                <div className="font-medium text-gray-800">{symptom.label}</div>
              </button>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information (Optional)
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Describe any other symptoms or concerns..."
              className="w-full p-4 border border-gray-300 rounded-xl resize-none h-24 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0}
            className={`btn-large w-full ${
              selectedSymptoms.length > 0 
                ? 'btn-primary' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="text-xl">🔍</span>
            {t('analyzeSymptoms')}
          </button>

          {/* Selected Count */}
          {selectedSymptoms.length > 0 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomInput