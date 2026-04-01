/**
 * SevaHealth AI - Medical Decision Support System
 * 
 * MEDICAL RESPONSIBILITY NOTICE:
 * This AI system is designed as a DECISION SUPPORT TOOL ONLY.
 * It does NOT provide medical diagnosis or treatment recommendations.
 * Always consult qualified healthcare professionals for medical decisions.
 */

// India-specific seasonal disease patterns
const SEASONAL_DISEASES = {
  monsoon: {
    months: [6, 7, 8, 9], // June-September
    common: ['dengue', 'malaria', 'typhoid', 'gastroenteritis', 'respiratory_infections'],
    risk_multiplier: 1.3
  },
  summer: {
    months: [3, 4, 5], // March-May
    common: ['heat_stroke', 'dehydration', 'gastroenteritis', 'skin_infections'],
    risk_multiplier: 1.2
  },
  winter: {
    months: [11, 12, 1, 2], // Nov-Feb
    common: ['respiratory_infections', 'pneumonia', 'bronchitis', 'joint_pain'],
    risk_multiplier: 1.1
  }
}

// Local language symptom mapping (India-specific)
const SYMPTOM_TRANSLATIONS = {
  // Hindi mappings
  'bukhar': 'fever',
  'khasi': 'cough',
  'sir dard': 'headache',
  'pet dard': 'stomach_pain',
  'chakkar': 'dizziness',
  'kamjori': 'weakness',
  'saans lene mein takleef': 'breathing_difficulty',
  'ulti': 'vomiting',
  'dast': 'diarrhea',
  'badan dard': 'body_ache',
  
  // Marathi mappings
  'taap': 'fever',
  'khokla': 'cough',
  'dokedukhee': 'headache',
  'potdukhee': 'stomach_pain',
  'chakkar': 'dizziness',
  'ashaktapana': 'weakness'
}

// Red flag symptoms that trigger emergency mode
const RED_FLAG_SYMPTOMS = [
  'chest_pain',
  'breathing_difficulty',
  'severe_headache',
  'high_fever', // >103°F
  'unconsciousness',
  'severe_bleeding',
  'stroke_symptoms',
  'heart_attack_symptoms'
]

// Hybrid AI Model: Rule-based + ML-style scoring
class MedicalAI {
  constructor() {
    this.confidence_threshold = {
      low: 0.3,
      medium: 0.6,
      high: 0.8
    }
  }

  /**
   * Main symptom analysis function
   * @param {Object} patientData - Patient symptoms and information
   * @returns {Object} Analysis with confidence scores and recommendations
   */
  analyzeSymptoms(patientData) {
    const { symptoms, duration, severity, age, gender, location } = patientData
    
    // Step 1: Check for red flags (emergency conditions)
    const emergencyCheck = this.checkRedFlags(symptoms, severity)
    if (emergencyCheck.isEmergency) {
      return this.generateEmergencyResponse(emergencyCheck)
    }

    // Step 2: Seasonal disease adjustment
    const seasonalAdjustment = this.getSeasonalRiskAdjustment()

    // Step 3: Symptom pattern matching with confidence scoring
    const conditions = this.matchSymptomPatterns(symptoms, duration, severity)

    // Step 4: Apply demographic and geographic adjustments
    const adjustedConditions = this.applyDemographicAdjustments(conditions, age, gender, location)

    // Step 5: Generate follow-up questions
    const followUpQuestions = this.generateFollowUpQuestions(symptoms, conditions)

    // Step 6: Create explainable output
    const explanation = this.generateExplanation(symptoms, conditions, seasonalAdjustment)

    return {
      riskLevel: this.calculateOverallRisk(adjustedConditions),
      conditions: adjustedConditions,
      confidence: this.calculateConfidence(adjustedConditions),
      followUpQuestions,
      explanation,
      recommendations: this.generateRecommendations(adjustedConditions),
      disclaimer: this.getMedicalDisclaimer(),
      seasonalAlert: seasonalAdjustment.alert,
      nextSteps: this.getNextSteps(adjustedConditions)
    }
  }

  /**
   * Check for emergency red flag symptoms
   */
  checkRedFlags(symptoms, severity) {
    const redFlags = symptoms.filter(symptom => 
      RED_FLAG_SYMPTOMS.includes(symptom) || 
      (symptom === 'fever' && severity?.fever > 103)
    )

    return {
      isEmergency: redFlags.length > 0,
      redFlags,
      urgencyLevel: redFlags.length > 1 ? 'critical' : 'high'
    }
  }

  /**
   * Generate emergency response
   */
  generateEmergencyResponse(emergencyCheck) {
    return {
      riskLevel: 'emergency',
      isEmergency: true,
      conditions: [{
        name: 'Emergency Medical Condition',
        confidence: 95,
        urgency: 'immediate'
      }],
      recommendations: [
        'Call 108 (Emergency) immediately',
        'Go to nearest hospital emergency department',
        'Do not delay medical attention',
        'If unconscious, place in recovery position'
      ],
      explanation: `Emergency symptoms detected: ${emergencyCheck.redFlags.join(', ')}. Immediate medical attention required.`,
      disclaimer: 'This is an emergency situation. Seek immediate professional medical help.',
      autoTriggerEmergency: true
    }
  }

  /**
   * Seasonal disease risk adjustment for India
   */
  getSeasonalRiskAdjustment() {
    const currentMonth = new Date().getMonth() + 1
    
    for (const [season, data] of Object.entries(SEASONAL_DISEASES)) {
      if (data.months.includes(currentMonth)) {
        return {
          season,
          riskMultiplier: data.risk_multiplier,
          commonDiseases: data.common,
          alert: this.getSeasonalAlert(season)
        }
      }
    }
    
    return { season: 'normal', riskMultiplier: 1.0, commonDiseases: [], alert: null }
  }

  /**
   * Generate seasonal health alerts
   */
  getSeasonalAlert(season) {
    const alerts = {
      monsoon: {
        message: 'Monsoon Alert: Higher risk of dengue, malaria, and water-borne diseases',
        prevention: ['Use mosquito nets', 'Drink boiled water', 'Avoid street food', 'Keep surroundings clean']
      },
      summer: {
        message: 'Summer Alert: Risk of heat-related illnesses and dehydration',
        prevention: ['Stay hydrated', 'Avoid direct sunlight', 'Wear light clothing', 'Take frequent breaks']
      },
      winter: {
        message: 'Winter Alert: Increased respiratory infections and joint problems',
        prevention: ['Keep warm', 'Wash hands frequently', 'Avoid crowded places', 'Get adequate rest']
      }
    }
    
    return alerts[season] || null
  }

  /**
   * Pattern matching with confidence scoring
   */
  matchSymptomPatterns(symptoms, duration, severity) {
    const patterns = {
      viral_infection: {
        symptoms: ['fever', 'cough', 'headache', 'weakness'],
        weight: 0.7,
        baseConfidence: 0.6
      },
      bacterial_infection: {
        symptoms: ['fever', 'weakness', 'body_ache'],
        weight: 0.6,
        baseConfidence: 0.5
      },
      gastroenteritis: {
        symptoms: ['stomach_pain', 'nausea', 'vomiting', 'diarrhea'],
        weight: 0.8,
        baseConfidence: 0.7
      },
      respiratory_infection: {
        symptoms: ['cough', 'fever', 'breathing_difficulty'],
        weight: 0.75,
        baseConfidence: 0.65
      },
      stress_related: {
        symptoms: ['headache', 'weakness', 'dizziness'],
        weight: 0.4,
        baseConfidence: 0.3
      }
    }

    const matches = []
    
    for (const [condition, pattern] of Object.entries(patterns)) {
      const matchScore = this.calculatePatternMatch(symptoms, pattern.symptoms)
      if (matchScore > 0.3) {
        const confidence = Math.min(
          pattern.baseConfidence + (matchScore * 0.3) + this.getDurationBonus(duration),
          0.95
        )
        
        matches.push({
          name: this.getConditionDisplayName(condition),
          confidence: Math.round(confidence * 100),
          matchScore,
          pattern: condition
        })
      }
    }

    return matches.sort((a, b) => b.confidence - a.confidence).slice(0, 3)
  }

  /**
   * Calculate pattern matching score
   */
  calculatePatternMatch(userSymptoms, patternSymptoms) {
    const matches = userSymptoms.filter(symptom => patternSymptoms.includes(symptom))
    return matches.length / patternSymptoms.length
  }

  /**
   * Duration-based confidence adjustment
   */
  getDurationBonus(duration) {
    if (!duration) return 0
    if (duration > 7) return 0.1 // Chronic symptoms
    if (duration > 3) return 0.05 // Persistent symptoms
    return 0 // Acute symptoms
  }

  /**
   * Apply demographic adjustments
   */
  applyDemographicAdjustments(conditions, age, gender, location) {
    return conditions.map(condition => {
      let adjustedConfidence = condition.confidence
      
      // Age-based adjustments
      if (age > 60 && ['respiratory_infection', 'viral_infection'].includes(condition.pattern)) {
        adjustedConfidence = Math.min(adjustedConfidence + 10, 95)
      }
      
      // Geographic adjustments (if location indicates rural area)
      if (location && location.includes('rural')) {
        adjustedConfidence = Math.min(adjustedConfidence + 5, 95)
      }

      return {
        ...condition,
        confidence: Math.round(adjustedConfidence)
      }
    })
  }

  /**
   * Generate intelligent follow-up questions
   */
  generateFollowUpQuestions(symptoms, conditions) {
    const questions = []
    
    if (symptoms.includes('fever')) {
      questions.push({
        question: 'Have you measured your temperature? What was the reading?',
        importance: 'high',
        type: 'temperature'
      })
    }
    
    if (symptoms.includes('cough')) {
      questions.push({
        question: 'Is it a dry cough or are you bringing up phlegm?',
        importance: 'medium',
        type: 'symptom_detail'
      })
    }
    
    if (symptoms.includes('stomach_pain')) {
      questions.push({
        question: 'Where exactly is the pain? Is it constant or comes in waves?',
        importance: 'high',
        type: 'pain_location'
      })
    }

    // Duration questions for all conditions
    questions.push({
      question: 'How long have you been experiencing these symptoms?',
      importance: 'high',
      type: 'duration'
    })

    return questions.slice(0, 3) // Limit to 3 most important questions
  }

  /**
   * Generate explainable AI output
   */
  generateExplanation(symptoms, conditions, seasonalAdjustment) {
    const topCondition = conditions[0]
    if (!topCondition) return 'Unable to determine likely conditions from provided symptoms.'

    let explanation = `Based on your symptoms (${symptoms.join(', ')}), the most likely condition is ${topCondition.name} with ${topCondition.confidence}% confidence. `
    
    explanation += `This assessment is based on symptom pattern matching and medical knowledge. `
    
    if (seasonalAdjustment.season !== 'normal') {
      explanation += `Current ${seasonalAdjustment.season} season increases risk of certain conditions. `
    }
    
    explanation += `Remember: This is AI guidance only, not a medical diagnosis.`
    
    return explanation
  }

  /**
   * Calculate overall risk level
   */
  calculateOverallRisk(conditions) {
    if (!conditions.length) return 'low'
    
    const maxConfidence = Math.max(...conditions.map(c => c.confidence))
    
    if (maxConfidence >= 80) return 'high'
    if (maxConfidence >= 60) return 'medium'
    return 'low'
  }

  /**
   * Calculate overall confidence
   */
  calculateConfidence(conditions) {
    if (!conditions.length) return 0
    return Math.max(...conditions.map(c => c.confidence))
  }

  /**
   * Generate medical recommendations
   */
  generateRecommendations(conditions) {
    const riskLevel = this.calculateOverallRisk(conditions)
    
    const baseRecommendations = [
      'Monitor your symptoms closely',
      'Stay hydrated and get adequate rest',
      'Maintain good hygiene practices'
    ]
    
    if (riskLevel === 'high') {
      return [
        'Consult a healthcare provider immediately',
        'Avoid contact with others to prevent spread',
        'Monitor temperature regularly',
        ...baseRecommendations
      ]
    }
    
    if (riskLevel === 'medium') {
      return [
        'Consider consulting a healthcare provider',
        'Monitor symptoms for 24-48 hours',
        'Seek medical help if symptoms worsen',
        ...baseRecommendations
      ]
    }
    
    return [
      'Continue monitoring symptoms',
      'Consult a healthcare provider if symptoms persist beyond 3 days',
      ...baseRecommendations
    ]
  }

  /**
   * Get next steps based on risk level
   */
  getNextSteps(conditions) {
    const riskLevel = this.calculateOverallRisk(conditions)
    
    return {
      immediate: riskLevel === 'high' ? 'Seek medical consultation today' : 'Continue monitoring',
      followUp: `Check symptoms again in ${riskLevel === 'high' ? '6-12 hours' : '24-48 hours'}`,
      emergency: 'Call 108 if symptoms worsen significantly or new severe symptoms appear'
    }
  }

  /**
   * Medical disclaimer - legally required
   */
  getMedicalDisclaimer() {
    return {
      title: 'Important Medical Disclaimer',
      content: 'SevaHealth AI is a decision support tool and does NOT provide medical diagnosis, treatment, or prescription advice. This guidance is for informational purposes only. Always consult qualified healthcare professionals for medical decisions. In emergencies, call 108 immediately.',
      emphasis: 'This AI system cannot replace professional medical judgment.'
    }
  }

  /**
   * Get user-friendly condition names
   */
  getConditionDisplayName(condition) {
    const displayNames = {
      viral_infection: 'Viral Infection (Common Cold/Flu)',
      bacterial_infection: 'Possible Bacterial Infection',
      gastroenteritis: 'Stomach Upset/Gastroenteritis',
      respiratory_infection: 'Respiratory Tract Infection',
      stress_related: 'Stress-related Symptoms'
    }
    
    return displayNames[condition] || condition.replace(/_/g, ' ')
  }

  /**
   * Translate local language symptoms to English
   */
  translateSymptoms(symptoms) {
    return symptoms.map(symptom => {
      const lowerSymptom = symptom.toLowerCase()
      return SYMPTOM_TRANSLATIONS[lowerSymptom] || symptom
    })
  }
}

// Export singleton instance
export const medicalAI = new MedicalAI()

// Utility functions for components
export const translateSymptom = (symptom) => {
  return SYMPTOM_TRANSLATIONS[symptom.toLowerCase()] || symptom
}

export const isEmergencySymptom = (symptom) => {
  return RED_FLAG_SYMPTOMS.includes(symptom)
}

export const getSeasonalAlert = () => {
  return new MedicalAI().getSeasonalRiskAdjustment()
}