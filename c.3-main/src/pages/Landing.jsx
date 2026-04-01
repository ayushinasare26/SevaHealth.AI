import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const Landing = () => {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', label: 'मराठी', flag: '🇮🇳' }
  ]

  return (
    <div key={language} className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🩺</span>
            <h1 className="text-2xl font-bold text-gray-800">{t('appName')}</h1>
          </div>
          
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-8xl mb-6">🩺</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t('appName')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('tagline')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <button
              onClick={() => navigate('/symptoms')}
              className="btn-large btn-primary w-full"
            >
              <span className="text-2xl">🔍</span>
              {t('startHealthCheck')}
            </button>

            <button
              onClick={() => navigate('/chat?mode=symptoms')}
              className="btn-large bg-blue-500 text-white hover:bg-blue-600 w-full"
            >
              <span className="text-2xl">🗣️</span>
              {t('talkToAISymptoms')}
            </button>

            <button
              onClick={() => navigate('/hospitals')}
              className="btn-large btn-secondary w-full"
            >
              <span className="text-2xl">🏥</span>
              {t('findHospitals')}
            </button>

            <button
              onClick={() => navigate('/health-card')}
              className="btn-large btn-secondary w-full"
            >
              <span className="text-2xl">🪪</span>
              {t('myHealthCard')}
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-12">
            <button
              onClick={() => navigate('/doctor')}
              className="text-primary hover:text-green-600 font-medium"
            >
              👨‍⚕️ {t('login')} (Doctor/Admin)
            </button>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{t('freeToUse')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{t('privacyProtected')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{t('worksOffline')}</span>
          </div>
        </div>
      </div>

      {/* Why SevaHealth AI is Different */}
      <div className="container mx-auto px-4 py-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            🏆 {t('whyDifferent')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📶</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{t('lowBandwidth')}</h3>
                <p className="text-xs text-gray-600">{t('worksOn2G')}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🗣️</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{t('localLanguage')}</h3>
                <p className="text-xs text-gray-600">{t('hindiMarathiSupport')}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{t('aiTriage')}</h3>
                <p className="text-xs text-gray-600">{t('smartRiskAssessment')}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏛️</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{t('govtIntegration')}</h3>
                <p className="text-xs text-gray-600">{t('ayushmanBharatReady')}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-sm">{t('ruralFirst')}</h3>
                <p className="text-xs text-gray-600">{t('builtForVillages')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-dashed border-primary">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              "{t('bridgeQuote')}"
            </p>
            <p className="text-gray-600">
              {t('designedFor600M')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing