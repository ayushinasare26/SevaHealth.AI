import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const EmergencyButton = () => {
  const { t } = useLanguage()
  const [showEmergency, setShowEmergency] = useState(false)

  const emergencyHospitals = [
    { name: 'Government General Hospital', phone: '+91-9876543210', distance: '1.2 km' },
    { name: 'City Medical Center', phone: '+91-9876543211', distance: '2.1 km' }
  ]

  const firstAidTips = [
    'Stay calm and breathe slowly',
    'If bleeding, apply pressure with clean cloth',
    'For fever, use cool water on forehead',
    'If unconscious, place in recovery position',
    'Call 108 immediately for serious conditions'
  ]

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  if (showEmergency) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-red-500 text-white p-4 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">🚨</span>
                Emergency Help
              </h2>
              <button
                onClick={() => setShowEmergency(false)}
                className="text-white text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Emergency Call */}
            <button
              onClick={() => handleCall('108')}
              className="w-full bg-red-500 text-white py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-3 hover:bg-red-600"
            >
              <span className="text-2xl">📞</span>
              Call 108 - Emergency
            </button>

            {/* Nearest Hospitals */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>🏥</span>
                Nearest Emergency Hospitals
              </h3>
              <div className="space-y-2">
                {emergencyHospitals.map((hospital, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{hospital.name}</p>
                      <p className="text-xs text-gray-600">{hospital.distance}</p>
                    </div>
                    <button
                      onClick={() => handleCall(hospital.phone)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* First Aid */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>🩹</span>
                Quick First Aid
              </h3>
              <div className="space-y-2">
                {firstAidTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowEmergency(true)}
      className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition-all z-40 animate-pulse"
      style={{ minWidth: '60px', minHeight: '60px' }}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl">🚨</span>
        <span className="text-xs font-bold">SOS</span>
      </div>
    </button>
  )
}

export default EmergencyButton