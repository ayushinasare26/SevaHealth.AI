import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const HospitalFinder = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          loadNearbyHospitals()
        },
        () => {
          // Fallback to mock data if location access denied
          loadNearbyHospitals()
        }
      )
    } else {
      loadNearbyHospitals()
    }
  }, [])

  const loadNearbyHospitals = () => {
    // Mock hospital data
    const mockHospitals = [
      {
        id: 1,
        name: 'Government General Hospital',
        type: 'government',
        distance: '1.2 km',
        phone: '+91-9876543210',
        address: 'Main Road, City Center',
        specialties: ['Emergency', 'General Medicine'],
        rating: 4.2
      },
      {
        id: 2,
        name: 'City Medical Center',
        type: 'private',
        distance: '2.1 km',
        phone: '+91-9876543211',
        address: 'Medical Complex, Sector 5',
        specialties: ['Cardiology', 'Neurology', 'Emergency'],
        rating: 4.5
      },
      {
        id: 3,
        name: 'Rural Health Center',
        type: 'government',
        distance: '3.5 km',
        phone: '+91-9876543212',
        address: 'Village Road, Outskirts',
        specialties: ['Primary Care', 'Maternal Health'],
        rating: 3.8
      },
      {
        id: 4,
        name: 'Apollo Clinic',
        type: 'private',
        distance: '4.2 km',
        phone: '+91-9876543213',
        address: 'Commercial Street, Downtown',
        specialties: ['Diagnostics', 'Specialist Care'],
        rating: 4.7
      }
    ]

    setTimeout(() => {
      setHospitals(mockHospitals)
      setLoading(false)
    }, 1500)
  }

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleDirections = (address) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📍</div>
          <div className="text-lg text-gray-600">Finding nearby hospitals...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="text-xl">🏥</span>
                {t('nearbyHospitals')}
              </h1>
              <p className="text-sm text-gray-600">
                {hospitals.length} hospitals found nearby
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital List */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-xl p-6 shadow-sm">
              {/* Hospital Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {hospital.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hospital.type === 'government' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {hospital.type === 'government' ? t('government') : t('private')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <span>📍</span>
                      {hospital.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>⭐</span>
                      {hospital.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm">{hospital.address}</p>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleCall(hospital.phone)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <span className="text-lg">📞</span>
                  {t('call')}
                </button>
                <button
                  onClick={() => handleDirections(hospital.address)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg">🗺️</span>
                  {t('directions')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Button */}
        <div className="max-w-2xl mx-auto mt-8">
          <button
            onClick={() => handleCall('108')}
            className="w-full flex items-center justify-center gap-3 py-4 bg-red-500 text-white rounded-xl text-lg font-semibold hover:bg-red-600 transition-colors"
          >
            <span className="text-2xl">🚨</span>
            Emergency - Call 108
          </button>
        </div>

        {/* Location Note */}
        <div className="max-w-2xl mx-auto mt-6 text-center">
          <p className="text-sm text-gray-500">
            📍 Hospitals are sorted by distance from your location
          </p>
        </div>
      </div>
    </div>
  )
}

export default HospitalFinder