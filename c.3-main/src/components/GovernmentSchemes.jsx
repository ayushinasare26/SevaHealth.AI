import { useState } from 'react'

const GovernmentSchemes = ({ patientProfile }) => {
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false)
  const [eligibilityData, setEligibilityData] = useState({
    income: '',
    category: '',
    state: '',
    hasRationCard: false
  })

  // Government healthcare schemes in India
  const schemes = [
    {
      id: 'ayushman_bharat',
      name: 'Ayushman Bharat (PM-JAY)',
      coverage: '₹5 lakh per family per year',
      eligibility: 'BPL families, SECC database beneficiaries',
      benefits: [
        'Free treatment at empaneled hospitals',
        'Covers 1,400+ medical packages',
        'Pre and post-hospitalization coverage',
        'No cap on family size and age'
      ],
      howToApply: [
        'Check eligibility at mera.pmjay.gov.in',
        'Visit nearest Common Service Center',
        'Carry Aadhaar and ration card',
        'Get Ayushman card issued'
      ],
      website: 'https://pmjay.gov.in',
      helpline: '14555'
    },
    {
      id: 'state_health_insurance',
      name: 'State Health Insurance Schemes',
      coverage: 'Varies by state (₹1-5 lakh)',
      eligibility: 'State-specific criteria',
      benefits: [
        'Free/subsidized treatment',
        'Cashless facility at government hospitals',
        'Coverage for chronic diseases',
        'Maternity benefits'
      ],
      howToApply: [
        'Visit district health office',
        'Submit income certificate',
        'Provide residence proof',
        'Get enrolled at PHC/CHC'
      ]
    },
    {
      id: 'janani_suraksha',
      name: 'Janani Suraksha Yojana (JSY)',
      coverage: '₹1,400 (rural) / ₹1,000 (urban)',
      eligibility: 'Pregnant women, especially BPL',
      benefits: [
        'Cash assistance for institutional delivery',
        'Free antenatal care',
        'Postnatal care support',
        'ASHA worker assistance'
      ],
      howToApply: [
        'Register at nearest ANM/ASHA',
        'Complete antenatal checkups',
        'Deliver at government facility',
        'Receive cash incentive'
      ]
    },
    {
      id: 'free_medicines',
      name: 'Free Medicine Initiative',
      coverage: 'Essential medicines at no cost',
      eligibility: 'All patients at government facilities',
      benefits: [
        'Free essential medicines',
        'Generic drugs available',
        'No prescription charges',
        'Quality assured medicines'
      ],
      howToApply: [
        'Visit government hospital/PHC',
        'Get prescription from doctor',
        'Collect medicines from pharmacy',
        'No additional documentation needed'
      ]
    }
  ]

  const checkEligibility = () => {
    // Simple eligibility logic (in real app, this would call government APIs)
    const results = []
    
    if (eligibilityData.income === 'bpl' || eligibilityData.hasRationCard) {
      results.push({
        scheme: 'Ayushman Bharat',
        eligible: true,
        confidence: 90,
        nextStep: 'Visit nearest CSC to get Ayushman card'
      })
    }
    
    if (eligibilityData.category === 'pregnant') {
      results.push({
        scheme: 'Janani Suraksha Yojana',
        eligible: true,
        confidence: 95,
        nextStep: 'Register with ASHA worker immediately'
      })
    }
    
    results.push({
      scheme: 'Free Medicine Initiative',
      eligible: true,
      confidence: 100,
      nextStep: 'Available at all government hospitals'
    })

    return results
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-dashed border-orange-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">🏛️</span>
        Government Healthcare Schemes
        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
          Information Only
        </span>
      </h3>

      {/* Quick Eligibility Check */}
      <div className="mb-4">
        <button
          onClick={() => setShowEligibilityChecker(!showEligibilityChecker)}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>🔍</span>
          Check Your Eligibility
        </button>
      </div>

      {showEligibilityChecker && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-orange-200">
          <h4 className="font-semibold text-gray-800 mb-3">Quick Eligibility Check</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Income Category
              </label>
              <select
                value={eligibilityData.income}
                onChange={(e) => setEligibilityData({...eligibilityData, income: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select category</option>
                <option value="bpl">Below Poverty Line (BPL)</option>
                <option value="apl">Above Poverty Line (APL)</option>
                <option value="unknown">Not sure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Category
              </label>
              <select
                value={eligibilityData.category}
                onChange={(e) => setEligibilityData({...eligibilityData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select if applicable</option>
                <option value="pregnant">Pregnant woman</option>
                <option value="senior">Senior citizen (60+)</option>
                <option value="disabled">Person with disability</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={eligibilityData.hasRationCard}
                onChange={(e) => setEligibilityData({...eligibilityData, hasRationCard: e.target.checked})}
                className="w-4 h-4 text-orange-500"
              />
              <span className="text-sm text-gray-700">I have a ration card</span>
            </label>
          </div>

          {eligibilityData.income && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Your Potential Eligibility:</h5>
              {checkEligibility().map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-800">{result.scheme}</p>
                    <p className="text-sm text-green-600">{result.nextStep}</p>
                  </div>
                  <span className="text-green-600 font-bold">{result.confidence}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scheme Cards */}
      <div className="space-y-4">
        {schemes.slice(0, 2).map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{scheme.name}</h4>
                <p className="text-sm text-green-600 font-medium">{scheme.coverage}</p>
              </div>
              {scheme.helpline && (
                <a
                  href={`tel:${scheme.helpline}`}
                  className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                >
                  Call {scheme.helpline}
                </a>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{scheme.eligibility}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-medium text-gray-700 mb-1">Key Benefits:</p>
                <ul className="space-y-1">
                  {scheme.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-green-500">•</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">How to Apply:</p>
                <ul className="space-y-1">
                  {scheme.howToApply.slice(0, 2).map((step, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notice */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-yellow-800 text-xs">
          <strong>Disclaimer:</strong> This is general information only. Eligibility criteria and benefits may vary. 
          Please verify with official government sources or visit your nearest government health facility for accurate information.
        </p>
      </div>

      {/* Quick Links */}
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="https://pmjay.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
        >
          🌐 PM-JAY Official
        </a>
        <a
          href="tel:14555"
          className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
        >
          📞 Helpline 14555
        </a>
      </div>
    </div>
  )
}

export default GovernmentSchemes