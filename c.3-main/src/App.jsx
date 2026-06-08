import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import EmergencyButton from './components/EmergencyButton'
import AccessibilityMode from './components/AccessibilityMode'
import RoleSelector from './components/RoleSelector'
import Landing from './pages/Landing'
import SymptomInput from './pages/SymptomInput'
import AIResult from './pages/AIResult'
import HospitalFinder from './pages/HospitalFinder'
import AIChat from './pages/AIChat'
import DoctorDashboard from './pages/DoctorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import HealthCard from './pages/HealthCard'
import { useState, useEffect } from 'react'

function App() {
  const [userRole, setUserRole] = useState(null)
  const [showRoleSelector, setShowRoleSelector] = useState(false)

  useEffect(() => {
    // Check if user has selected a role
    const savedRole = localStorage.getItem('userRole')
    if (savedRole) {
      setUserRole(savedRole)
    } else {
      // Temporarily disable role selector for testing
      setUserRole('patient')
      localStorage.setItem('userRole', 'patient')
    }
  }, [])

  const handleRoleSelect = (role) => {
    setUserRole(role)
    setShowRoleSelector(false)
  }

  if (showRoleSelector) {
    return (
      <LanguageProvider>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </LanguageProvider>
    )
  }

  return (
    <LanguageProvider>
      <AccessibilityMode>
        <div className="min-h-screen bg-mint-cream">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/symptoms" element={<SymptomInput />} />
            <Route path="/result" element={<AIResult />} />
            <Route path="/hospitals" element={<HospitalFinder />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/health-card" element={<HealthCard />} />
            <Route path="/role-select" element={<RoleSelector onRoleSelect={handleRoleSelect} />} />
          </Routes>
          <EmergencyButton />
        </div>
      </AccessibilityMode>
    </LanguageProvider>
  )
}

export default App