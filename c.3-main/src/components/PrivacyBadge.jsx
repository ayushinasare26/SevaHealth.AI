import { useState } from 'react'

const PrivacyBadge = ({ onConsentChange, showConsent = false }) => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  const handleConsentChange = (consent) => {
    setHasConsented(consent)
    onConsentChange?.(consent)
  }

  return (
    <>
      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
          <span className="text-green-600">🔒</span>
          <span className="text-green-800 font-medium">Your data is encrypted & private</span>
        </div>
        <button
          onClick={() => setShowPrivacyModal(true)}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Learn more
        </button>
      </div>

      {/* Consent Checkbox */}
      {showConsent && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => handleConsentChange(e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="text-sm">
              <p className="text-gray-800 font-medium mb-1">
                Data Consent Required
              </p>
              <p className="text-gray-600">
                I consent to SevaHealth AI storing my health information securely for providing health guidance. 
                My data will be encrypted and never shared without permission.
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span>🔒</span>
                  Privacy & Security
                </h2>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    What We Protect
                  </h3>
                  <ul className="space-y-1 ml-6">
                    <li>• Your symptoms and health information</li>
                    <li>• Personal details (name, age, contact)</li>
                    <li>• Medical history and medications</li>
                    <li>• Chat conversations with AI</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-blue-600">🛡️</span>
                    How We Protect
                  </h3>
                  <ul className="space-y-1 ml-6">
                    <li>• End-to-end encryption of all data</li>
                    <li>• Local storage (data stays on your device)</li>
                    <li>• No data sharing with third parties</li>
                    <li>• Secure HTTPS connections only</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-purple-600">👥</span>
                    Who Can Access
                  </h3>
                  <ul className="space-y-1 ml-6">
                    <li>• <strong>You:</strong> Full access to your data</li>
                    <li>• <strong>Doctors:</strong> Only with your permission</li>
                    <li>• <strong>Emergency:</strong> Basic info for medical help</li>
                    <li>• <strong>No one else:</strong> Ever, under any circumstance</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-xs">
                    <strong>Important:</strong> SevaHealth AI is a health guidance tool, not a replacement for professional medical advice. 
                    Always consult qualified healthcare providers for medical decisions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PrivacyBadge