import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RoleSelector = ({ onRoleSelect }) => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [
    {
      id: 'patient',
      title: 'Patient',
      description: 'Get health guidance and symptom assessment',
      icon: '👤',
      color: 'bg-blue-500',
      features: ['Symptom checker', 'AI health guidance', 'Hospital finder', 'Health card']
    },
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Access patient summaries and medical dashboard',
      icon: '👨‍⚕️',
      color: 'bg-green-500',
      features: ['Patient dashboard', 'AI summaries', 'Medical history', 'Prescription tools']
    },
    {
      id: 'health_worker',
      title: 'Health Worker',
      description: 'ASHA/Anganwadi worker assisted mode',
      icon: '👩‍⚕️',
      color: 'bg-purple-500',
      features: ['Multiple patients', 'Offline support', 'Community health', 'Government schemes']
    }
  ]

  const handleRoleSelection = (roleId) => {
    setSelectedRole(roleId)
    localStorage.setItem('userRole', roleId)
    onRoleSelect?.(roleId)

    // Navigate based on role
    switch (roleId) {
      case 'doctor':
        navigate('/doctor')
        break
      case 'health_worker':
        navigate('/health-worker')
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🩺</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to SevaHealth AI
          </h1>
          <p className="text-gray-600">
            Choose your role to get started with personalized healthcare guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelection(role.id)}
              className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {role.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {role.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Features:</p>
                {role.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="text-green-600">🔒</span>
            <span>Secure • Private • HIPAA-compliant design</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleSelector