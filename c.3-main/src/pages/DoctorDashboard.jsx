import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      riskLevel: 'medium',
      symptoms: ['fever', 'cough', 'headache'],
      timestamp: '2024-01-15 10:30 AM',
      location: 'Village Patna, Bihar',
      aiSummary: 'Patient presents with fever, cough, and headache. Symptoms suggest viral infection. Recommended rest and monitoring.',
      vitals: { temperature: '101°F', bp: '120/80', pulse: '85 bpm' }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 28,
      gender: 'Female',
      riskLevel: 'low',
      symptoms: ['headache', 'weakness'],
      timestamp: '2024-01-15 11:15 AM',
      location: 'Pune, Maharashtra',
      aiSummary: 'Mild symptoms likely due to stress or dehydration. Advised rest and hydration.',
      vitals: { temperature: '98.6°F', bp: '110/70', pulse: '72 bpm' }
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      age: 60,
      gender: 'Male',
      riskLevel: 'high',
      symptoms: ['fever', 'weakness', 'stomachPain'],
      timestamp: '2024-01-15 09:45 AM',
      location: 'Lucknow, UP',
      aiSummary: 'Multiple symptoms with high fever. Requires immediate medical attention. Possible gastroenteritis.',
      vitals: { temperature: '103°F', bp: '140/90', pulse: '95 bpm' }
    }
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple mock login
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true)
    }
  }

  const getRiskBadge = (level) => {
    const badges = {
      low: { class: 'bg-green-100 text-green-800', icon: '🟢' },
      medium: { class: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
      high: { class: 'bg-red-100 text-red-800', icon: '🔴' }
    }
    return badges[level]
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-mint-cream flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Login</h1>
            <p className="text-gray-600">Access patient dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="doctor@hospital.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-large btn-primary"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-primary hover:text-green-600"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-mint-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-2xl"
              >
                ←
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-xl">👨‍⚕️</span>
                  Doctor Dashboard
                </h1>
                <p className="text-sm text-gray-600">Patient Management System</p>
              </div>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Patients ({patients.length})
                </h2>
              </div>
              <div className="divide-y">
                {patients.map((patient) => {
                  const riskBadge = getRiskBadge(patient.riskLevel)
                  return (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedPatient?.id === patient.id ? 'bg-green-50 border-r-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-gray-800">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.age}y, {patient.gender}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskBadge.class}`}>
                          {riskBadge.icon}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{patient.timestamp}</p>
                      <p className="text-xs text-gray-500">{patient.location}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.age} years old, {selectedPatient.gender}</p>
                      <p className="text-sm text-gray-500">{selectedPatient.location}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRiskBadge(selectedPatient.riskLevel).class}`}>
                        {getRiskBadge(selectedPatient.riskLevel).icon} {selectedPatient.riskLevel.toUpperCase()} RISK
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{selectedPatient.timestamp}</p>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-xl">🤖</span>
                    AI Summary
                  </h3>
                  <p className="text-gray-700">{selectedPatient.aiSummary}</p>
                </div>

                {/* Symptoms & Vitals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Reported Symptoms</h3>
                    <div className="space-y-2">
                      {selectedPatient.symptoms.map((symptom, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <span className="text-red-500">•</span>
                          <span className="capitalize">{symptom.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Vitals</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperature:</span>
                        <span className="font-medium">{selectedPatient.vitals.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blood Pressure:</span>
                        <span className="font-medium">{selectedPatient.vitals.bp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pulse:</span>
                        <span className="font-medium">{selectedPatient.vitals.pulse}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="btn-large btn-primary">
                      <span className="text-xl">💬</span>
                      Start Chat
                    </button>
                    <button className="btn-large btn-secondary">
                      <span className="text-xl">📝</span>
                      Add Notes
                    </button>
                    <button className="btn-large btn-secondary">
                      <span className="text-xl">📋</span>
                      Prescribe
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Patient</h3>
                <p className="text-gray-600">Choose a patient from the list to view their details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard