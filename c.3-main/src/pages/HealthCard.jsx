import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import PrivacyBadge from '../components/PrivacyBadge'
import HealthID from '../components/HealthID'

const HealthCard = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [hasConsented, setHasConsented] = useState(false)
  const [profile, setProfile] = useState({
    // Basic Information
    name: '',
    age: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    emergencyContact: '',
    
    // Medical History
    lastDiagnosis: '',
    currentMedications: '',
    allergies: '',
    
    // Blood Report Data
    hemoglobin: '',
    bloodSugar: '',
    cholesterol: '',
    lastBloodTestDate: '',
    bloodTestNotes: '',
    
    // Extended Medical Profile
    chronicDiseases: [],
    pastSurgeries: [],
    vaccinationHistory: [],
    familyHistory: '',
    
    // Lifestyle Factors
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseLevel: '',
    dietType: '',
    
    // Emergency Information
    medicalAlerts: '',
    insuranceInfo: '',
    preferredHospital: ''
  })

  const [uploadedReports, setUploadedReports] = useState([])
  const [showAdvancedFields, setShowAdvancedFields] = useState(false)

  useEffect(() => {
    // Load saved profile
    const savedProfile = localStorage.getItem('healthProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
    
    // Load uploaded reports
    const savedReports = localStorage.getItem('medicalReports')
    if (savedReports) {
      setUploadedReports(JSON.parse(savedReports))
    }
  }, [])

  const handleSave = () => {
    if (!hasConsented) {
      alert('Please provide consent to save your health information.')
      return
    }
    
    localStorage.setItem('healthProfile', JSON.stringify(profile))
    alert('Health Card saved successfully!')
  }

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayInputChange = (field, index, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setProfile(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newReports = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      // In real app, would upload to secure server
      url: URL.createObjectURL(file)
    }))
    
    const updatedReports = [...uploadedReports, ...newReports]
    setUploadedReports(updatedReports)
    localStorage.setItem('medicalReports', JSON.stringify(updatedReports))
  }

  const chronicDiseaseOptions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 
    'Thyroid Disorder', 'Kidney Disease', 'Liver Disease', 'Cancer History'
  ]

  const vaccinationOptions = [
    'COVID-19', 'Hepatitis B', 'Tetanus', 'Influenza', 'Pneumonia', 
    'Typhoid', 'Japanese Encephalitis', 'Meningitis'
  ]

  return (
    <div className="min-h-screen bg-mint-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-2xl"
            >
              ←
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-xl">🪪</span>
                Digital Health Card
              </h1>
              <p className="text-sm text-gray-600">Your digital OPD slip</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Privacy Badge */}
          <PrivacyBadge 
            showConsent={true} 
            onConsentChange={setHasConsented}
          />

          {/* Health ID Card */}
          <div className="mb-8">
            <HealthID 
              patientData={profile}
              onHealthIDGenerated={(id) => console.log('Health ID generated:', id)}
            />
          </div>

          {/* Health Card Preview */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white mb-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">🩺 SevaHealth AI</h2>
                <p className="text-green-100">Digital Health Card</p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-100">Name</p>
                <p className="font-semibold">{profile.name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-green-100">Age</p>
                <p className="font-semibold">{profile.age || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-green-100">Blood Group</p>
                <p className="font-semibold">{profile.bloodGroup || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-green-100">Gender</p>
                <p className="font-semibold">{profile.gender || 'Not provided'}</p>
              </div>
            </div>
            
            {/* Medical Alerts */}
            {(profile.allergies || profile.chronicDiseases.length > 0) && (
              <div className="mt-4 p-3 bg-red-500 bg-opacity-30 rounded-lg border border-red-300">
                <h4 className="font-semibold text-red-100 mb-1 flex items-center gap-2">
                  <span>⚠️</span>
                  Medical Alerts
                </h4>
                {profile.allergies && (
                  <p className="text-red-100 text-sm">Allergies: {profile.allergies}</p>
                )}
                {profile.chronicDiseases.length > 0 && (
                  <p className="text-red-100 text-sm">
                    Chronic: {profile.chronicDiseases.filter(d => d).join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Complete Your Health Profile
              </h3>
              <p className="text-gray-600 text-sm">
                Acts like a digital OPD slip • Helps doctors understand you better
              </p>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>👤</span>
                Basic Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="25"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    value={profile.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>📞</span>
                Contact Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="+91 9876543211"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🏥</span>
                Medical History
              </h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Diagnosis
                </label>
                <input
                  type="text"
                  value={profile.lastDiagnosis}
                  onChange={(e) => handleInputChange('lastDiagnosis', e.target.value)}
                  placeholder="e.g., Common cold, Fever"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <textarea
                  value={profile.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  placeholder="List any medicines you're currently taking"
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <input
                  type="text"
                  value={profile.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="e.g., Penicillin, Peanuts"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Blood Reports Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🩸</span>
                Blood Reports
              </h4>
              
              {/* Upload Blood Reports */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="bloodReportUpload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="bloodReportUpload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">📄</span>
                  <span className="text-gray-600">Upload Blood Reports</span>
                  <span className="text-sm text-gray-500">
                    PDF, Images, or Documents (Max 10MB each)
                  </span>
                </label>
              </div>

              {/* Display Uploaded Reports */}
              {uploadedReports.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-gray-700">Uploaded Reports</h5>
                  <div className="space-y-2">
                    {uploadedReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {report.type.includes('pdf') ? '📄' : '🖼️'}
                          </span>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {report.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(report.uploadDate).toLocaleDateString()} • 
                              {(report.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.open(report.url, '_blank')}
                            className="text-primary hover:text-primary-dark text-sm font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              const updatedReports = uploadedReports.filter(r => r.id !== report.id)
                              setUploadedReports(updatedReports)
                              localStorage.setItem('medicalReports', JSON.stringify(updatedReports))
                            }}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blood Report Summary */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <span>📊</span>
                  Latest Blood Work Summary
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">
                      Hemoglobin (g/dL)
                    </label>
                    <input
                      type="text"
                      value={profile.hemoglobin || ''}
                      onChange={(e) => handleInputChange('hemoglobin', e.target.value)}
                      placeholder="e.g., 12.5"
                      className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">
                      Blood Sugar (mg/dL)
                    </label>
                    <input
                      type="text"
                      value={profile.bloodSugar || ''}
                      onChange={(e) => handleInputChange('bloodSugar', e.target.value)}
                      placeholder="e.g., 95"
                      className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">
                      Cholesterol (mg/dL)
                    </label>
                    <input
                      type="text"
                      value={profile.cholesterol || ''}
                      onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                      placeholder="e.g., 180"
                      className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">
                      Last Test Date
                    </label>
                    <input
                      type="date"
                      value={profile.lastBloodTestDate || ''}
                      onChange={(e) => handleInputChange('lastBloodTestDate', e.target.value)}
                      className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    value={profile.bloodTestNotes || ''}
                    onChange={(e) => handleInputChange('bloodTestNotes', e.target.value)}
                    placeholder="Any specific observations or doctor's notes about blood work"
                    className="w-full p-2 border border-blue-300 rounded resize-none h-16 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="btn-large btn-primary w-full"
            >
              <span className="text-xl">💾</span>
              Save Health Card
            </button>

            {/* Benefits */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <span>✅</span>
                Why Health Card Helps
              </h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>• Faster consultations with doctors</p>
                <p>• Emergency medical information ready</p>
                <p>• Track your health history over time</p>
                <p>• Store and access blood reports digitally</p>
                <p>• Works like a digital OPD slip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthCard