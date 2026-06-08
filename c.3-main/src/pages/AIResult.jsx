import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { medicalAI, getSeasonalAlert } from '../utils/medicalAI'
import GovernmentSchemes from '../components/GovernmentSchemes'

const AIResult = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [symptoms, setSymptoms] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [seasonalAlert, setSeasonalAlert] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    // Get symptoms from sessionStorage
    const storedSymptoms = sessionStorage.getItem('symptoms')
    if (!storedSymptoms) {
      navigate('/symptoms')
      return
    }

    const symptomsData = JSON.parse(storedSymptoms)
    setSymptoms(symptomsData)

    // Get patient profile for enhanced analysis
    const patientProfile = JSON.parse(localStorage.getItem('healthProfile') || '{}')
    
    // Enhanced AI analysis using medical AI system
    const enhancedAnalysis = medicalAI.analyzeSymptoms({
      symptoms: symptomsData.selected,
      duration: symptomsData.duration || null,
      severity: symptomsData.severity || {},
      age: patientProfile.age || null,
      gender: patientProfile.gender || null,
      location: 'India', // Could be more specific based on user location
      additionalInfo: symptomsData.additional || ''
    })

    setAnalysis(enhancedAnalysis)

    // Get seasonal health alert
    const seasonal = getSeasonalAlert()
    setSeasonalAlert(seasonal)

    // Auto-trigger emergency mode if needed
    if (enhancedAnalysis.autoTriggerEmergency) {
      // Emergency mode would be triggered here
      console.log('Emergency mode triggered:', enhancedAnalysis)
    }
  }, [navigate])

  if (!symptoms || !analysis) {
    return (
      <div className="min-h-screen bg-mint-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <div className="text-lg text-gray-600">AI is analyzing your symptoms...</div>
          <div className="text-sm text-gray-500 mt-2">Using advanced medical intelligence</div>
        </div>
      </div>
    )
  }

  const getRiskBadge = (level) => {
    const badges = {
      low: { class: 'risk-low', icon: '🟢', text: t('riskLow') },
      medium: { class: 'risk-medium', icon: '🟡', text: t('riskMedium') },
      high: { class: 'risk-high', icon: '🔴', text: t('riskHigh') },
      emergency: { class: 'bg-red-600 text-white border border-red-700', icon: '🚨', text: 'EMERGENCY' }
    }
    return badges[level] || badges.low
  }

  const riskBadge = getRiskBadge(analysis.riskLevel)

  return (
    <div className="min-h-screen bg-mint-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/symptoms')}
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
                <div className="w-8 h-2 bg-primary rounded"></div>
                <div className="w-8 h-2 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-500 ml-2">Step 2 of 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Seasonal Health Alert */}
          {seasonalAlert?.alert && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🌦️</span>
                {seasonalAlert.alert.message}
              </h3>
              <div className="text-sm text-yellow-700">
                <p className="mb-2">Prevention tips:</p>
                <ul className="space-y-1">
                  {seasonalAlert.alert.prevention.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Risk Badge */}
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold ${riskBadge.class}`}>
              <span className="text-2xl">{riskBadge.icon}</span>
              {riskBadge.text}
            </div>
          </div>

          {/* Possible Conditions with Confidence */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🔍</span>
              {t('possibleConditions')}
              <span className="text-sm font-normal text-gray-500">(AI Confidence)</span>
            </h3>
            <div className="space-y-3">
              {analysis.conditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-500">•</span>
                    <span className="text-gray-700 font-medium">{condition.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${condition.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {condition.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center gap-1">
              <span>🤖</span>
              AI transparency builds trust • Higher confidence = more likely
            </div>
          </div>

          {/* Diet & Home Care Tips */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🍲</span>
              Diet & Home Care (AI Recommendations)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-green-700 flex items-center gap-2">
                  <span>✅</span>
                  What to Eat
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>🥛</span>
                    <span>Warm milk with turmeric (haldi)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🍯</span>
                    <span>Honey with ginger (adrak)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🍲</span>
                    <span>Light dal-chawal, khichdi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🥤</span>
                    <span>Plenty of warm water, herbal tea</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-red-700 flex items-center gap-2">
                  <span>❌</span>
                  What to Avoid
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span>🧊</span>
                    <span>Cold drinks, ice cream</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🍟</span>
                    <span>Fried foods, street food</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🥛</span>
                    <span>Dairy if stomach upset</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌶️</span>
                    <span>Very spicy food</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                <span>⚠️</span>
                When to Worry
              </h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Fever above 102°F for more than 2 days</p>
                <p>• Difficulty breathing or chest pain</p>
                <p>• Severe dehydration or unable to keep fluids down</p>
                <p>• Symptoms getting worse instead of better</p>
              </div>
            </div>
          </div>

          {/* Follow-up Reminder */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-dashed border-primary">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⏰</span>
              AI Follow-up Care
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-medium text-gray-800">
                    AI will remind you in {analysis.followUpDays} day{analysis.followUpDays !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-600">
                    SMS reminder to check your symptoms
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">🔄</span>
                <div>
                  <p className="font-medium text-gray-800">Continuity of Care</p>
                  <p className="text-sm text-gray-600">
                    Prevents dropouts • Tracks recovery progress
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          {analysis.explanation && (
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-xl">🧠</span>
                AI Analysis Explanation
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full hover:bg-blue-200"
                >
                  {showExplanation ? 'Hide' : 'Show'} Details
                </button>
              </h3>
              
              {showExplanation && (
                <div className="space-y-3">
                  <p className="text-gray-700">{analysis.explanation}</p>
                  
                  {analysis.followUpQuestions && analysis.followUpQuestions.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Follow-up Questions:</h4>
                      <div className="space-y-2">
                        {analysis.followUpQuestions.map((q, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-700">{q.question}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              q.importance === 'high' ? 'bg-red-100 text-red-800' :
                              q.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {q.importance} priority
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Government Schemes */}
          <GovernmentSchemes patientProfile={JSON.parse(localStorage.getItem('healthProfile') || '{}')} />

          {/* Medical Disclaimer */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/hospitals')}
              className="btn-large btn-primary w-full"
            >
              <span className="text-xl">🏥</span>
              {t('findHospitals')}
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="btn-large btn-secondary w-full"
            >
              <span className="text-xl">💬</span>
              {t('talkToDoctor')}
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="btn-large btn-secondary w-full"
            >
              <span className="text-xl">🤖</span>
              {t('chatWithAI')}
            </button>
          </div>

          {/* Medical Disclaimer - Legally Required */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              {analysis.disclaimer?.title || 'Important Medical Disclaimer'}
            </h3>
            <div className="space-y-3 text-sm text-red-700">
              <p>
                {analysis.disclaimer?.content || 
                'SevaHealth AI is a decision support tool and does NOT provide medical diagnosis, treatment, or prescription advice. This guidance is for informational purposes only.'}
              </p>
              <p className="font-semibold">
                {analysis.disclaimer?.emphasis || 'Always consult qualified healthcare professionals for medical decisions.'}
              </p>
              <div className="flex items-center gap-2 p-3 bg-red-100 rounded-lg">
                <span className="text-xl">🚨</span>
                <p className="font-medium">
                  In emergencies, call 108 immediately. Do not rely solely on AI guidance for urgent medical situations.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </div>
    </div>
  )
}

export default AIResult