import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  // Mock analytics data
  const analytics = {
    dailyUsers: 1247,
    totalConsultations: 5632,
    emergencyAlerts: 12,
    topSymptoms: [
      { name: 'Fever', count: 234, percentage: 28 },
      { name: 'Cough', count: 198, percentage: 24 },
      { name: 'Headache', count: 156, percentage: 19 },
      { name: 'Weakness', count: 123, percentage: 15 },
      { name: 'Stomach Pain', count: 89, percentage: 11 }
    ],
    areaData: [
      { area: 'Rural Bihar', cases: 145, riskLevel: 'high' },
      { area: 'Urban Maharashtra', cases: 98, riskLevel: 'medium' },
      { area: 'Rural UP', cases: 167, riskLevel: 'high' },
      { area: 'Urban Karnataka', cases: 76, riskLevel: 'low' }
    ],
    alerts: [
      { id: 1, type: 'outbreak', message: 'Fever outbreak detected in Rural Bihar', time: '2 hours ago', severity: 'high' },
      { id: 2, type: 'resource', message: 'Low medicine stock at PHC Patna', time: '4 hours ago', severity: 'medium' },
      { id: 3, type: 'system', message: 'High user activity in Maharashtra region', time: '6 hours ago', severity: 'low' }
    ]
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true)
    }
  }

  const getRiskColor = (level) => {
    const colors = {
      low: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      high: 'text-red-600 bg-red-100'
    }
    return colors[level] || colors.low
  }

  const getAlertColor = (severity) => {
    const colors = {
      low: 'border-l-blue-500 bg-blue-50',
      medium: 'border-l-yellow-500 bg-yellow-50',
      high: 'border-l-red-500 bg-red-50'
    }
    return colors[severity] || colors.low
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🏛️</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access system dashboard</p>
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
                placeholder="admin@health.gov.in"
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
    <div className="min-h-screen bg-gray-50">
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
                  <span className="text-xl">🏛️</span>
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Health System Monitoring</p>
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
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Active Users</p>
                <p className="text-2xl font-bold text-gray-800">{analytics.dailyUsers.toLocaleString()}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <div className="mt-2 text-sm text-green-600">↗ +12% from yesterday</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Consultations</p>
                <p className="text-2xl font-bold text-gray-800">{analytics.totalConsultations.toLocaleString()}</p>
              </div>
              <div className="text-3xl">🩺</div>
            </div>
            <div className="mt-2 text-sm text-green-600">↗ +8% this week</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emergency Alerts</p>
                <p className="text-2xl font-bold text-red-600">{analytics.emergencyAlerts}</p>
              </div>
              <div className="text-3xl">🚨</div>
            </div>
            <div className="mt-2 text-sm text-red-600">3 new alerts today</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">98.5%</p>
              </div>
              <div className="text-3xl">💚</div>
            </div>
            <div className="mt-2 text-sm text-gray-600">All systems operational</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Disease Heatmap */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              Disease Outbreak Heatmap
            </h3>
            <div className="space-y-4">
              {analytics.areaData.map((area, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">{area.area}</h4>
                      <p className="text-sm text-gray-600">{area.cases} active cases</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(area.riskLevel)}`}>
                      {area.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  {/* Heat indicator */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" 
                       style={{ 
                         backgroundColor: area.riskLevel === 'high' ? '#EF4444' : 
                                        area.riskLevel === 'medium' ? '#F59E0B' : '#10B981',
                         opacity: 0.7 
                       }}>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
              <span>🚨</span>
              Early outbreak detection helps authorities act quickly
            </div>
          </div>

          {/* Top Symptoms */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span>
              Common Symptoms Trend
            </h3>
            <div className="space-y-4">
              {analytics.topSymptoms.map((symptom, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{symptom.name}</span>
                    <span className="text-sm text-gray-600">{symptom.count} cases</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${symptom.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🚨</span>
              Emergency Alerts & Notifications
            </h3>
            <div className="space-y-4">
              {analytics.alerts.map((alert) => (
                <div key={alert.id} className={`border-l-4 p-4 rounded-r-lg ${getAlertColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{alert.message}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="btn-large btn-primary">
                <span className="text-xl">📢</span>
                Send Alert
              </button>
              <button className="btn-large btn-secondary">
                <span className="text-xl">📊</span>
                Generate Report
              </button>
              <button className="btn-large btn-secondary">
                <span className="text-xl">⚙️</span>
                System Settings
              </button>
              <button className="btn-large btn-secondary">
                <span className="text-xl">👥</span>
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard