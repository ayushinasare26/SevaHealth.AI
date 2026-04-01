import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const translations = {
    en: {
      appName: 'SevaHealth AI',
      tagline: 'Healthcare guidance for everyone',
      startHealthCheck: 'Start Health Check',
      talkToAISymptoms: 'Talk to AI About Symptoms',
      findHospitals: 'Find Nearby Hospitals',
      myHealthCard: 'My Health Card',
      chatWithAI: 'Chat with AI',
      login: 'Login',
      selectSymptoms: 'Select your symptoms',
      fever: 'Fever',
      cough: 'Cough',
      headache: 'Headache',
      weakness: 'Weakness',
      stomachPain: 'Stomach Pain',
      analyzeSymptoms: 'Analyze Symptoms',
      riskLow: 'Low Risk',
      riskMedium: 'Medium Risk',
      riskHigh: 'High Risk',
      possibleConditions: 'Possible Conditions',
      whatToDo: 'What You Should Do',
      talkToDoctor: 'Talk to Doctor',
      nearbyHospitals: 'Nearby Hospitals',
      government: 'Government',
      private: 'Private',
      call: 'Call',
      directions: 'Directions',
      freeToUse: 'Free to use',
      privacyProtected: 'Privacy protected',
      worksOffline: 'Works offline',
      whyDifferent: 'Why SevaHealth AI is Different',
      lowBandwidth: 'Low Bandwidth',
      worksOn2G: 'Works on 2G networks',
      localLanguage: 'Local Language',
      hindiMarathiSupport: 'Hindi, Marathi support',
      aiTriage: 'AI Triage',
      smartRiskAssessment: 'Smart risk assessment',
      govtIntegration: 'Govt Integration',
      ayushmanBharatReady: 'Ayushman Bharat ready',
      ruralFirst: 'Rural-First',
      builtForVillages: 'Built for villages',
      bridgeQuote: 'We didn\'t build a hospital app. We built a bridge between rural India and healthcare.',
      designedFor600M: 'Designed for 600+ million rural Indians with limited digital literacy'
    },
    hi: {
      appName: 'सेवा हेल्थ AI',
      tagline: 'सभी के लिए स्वास्थ्य मार्गदर्शन',
      startHealthCheck: 'स्वास्थ्य जांच शुरू करें',
      talkToAISymptoms: 'AI से अपने लक्षणों के बारे में बात करें',
      findHospitals: 'नजदीकी अस्पताल खोजें',
      myHealthCard: 'मेरा स्वास्थ्य कार्ड',
      chatWithAI: 'AI से बात करें',
      login: 'लॉगिन',
      selectSymptoms: 'अपने लक्षण चुनें',
      fever: 'बुखार',
      cough: 'खांसी',
      headache: 'सिरदर्द',
      weakness: 'कमजोरी',
      stomachPain: 'पेट दर्द',
      analyzeSymptoms: 'लक्षणों का विश्लेषण करें',
      riskLow: 'कम जोखिम',
      riskMedium: 'मध्यम जोखिम',
      riskHigh: 'उच्च जोखिम',
      possibleConditions: 'संभावित स्थितियां',
      whatToDo: 'आपको क्या करना चाहिए',
      talkToDoctor: 'डॉक्टर से बात करें',
      nearbyHospitals: 'नजदीकी अस्पताल',
      government: 'सरकारी',
      private: 'निजी',
      call: 'कॉल करें',
      directions: 'दिशा-निर्देश',
      freeToUse: 'उपयोग के लिए मुफ्त',
      privacyProtected: 'गोपनीयता सुरक्षित',
      worksOffline: 'ऑफलाइन काम करता है',
      whyDifferent: 'सेवा हेल्थ AI क्यों अलग है',
      lowBandwidth: 'कम बैंडविड्थ',
      worksOn2G: '2G नेटवर्क पर काम करता है',
      localLanguage: 'स्थानीय भाषा',
      hindiMarathiSupport: 'हिंदी, मराठी समर्थन',
      aiTriage: 'AI ट्राइएज',
      smartRiskAssessment: 'स्मार्ट जोखिम मूल्यांकन',
      govtIntegration: 'सरकारी एकीकरण',
      ayushmanBharatReady: 'आयुष्मान भारत तैयार',
      ruralFirst: 'ग्रामीण-प्रथम',
      builtForVillages: 'गांवों के लिए बनाया गया',
      bridgeQuote: 'हमने अस्पताल ऐप नहीं बनाया। हमने ग्रामीण भारत और स्वास्थ्य सेवा के बीच एक पुल बनाया।',
      designedFor600M: 'सीमित डिजिटल साक्षरता वाले 600+ मिलियन ग्रामीण भारतीयों के लिए डिज़ाइन किया गया'
    },
    mr: {
      appName: 'सेवा हेल्थ AI',
      tagline: 'सर्वांसाठी आरोग्य मार्गदर्शन',
      startHealthCheck: 'आरोग्य तपासणी सुरू करा',
      talkToAISymptoms: 'AI शी तुमच्या लक्षणांबद्दल बोला',
      findHospitals: 'जवळचे रुग्णालय शोधा',
      myHealthCard: 'माझे आरोग्य कार्ड',
      chatWithAI: 'AI शी बोला',
      login: 'लॉगिन',
      selectSymptoms: 'तुमची लक्षणे निवडा',
      fever: 'ताप',
      cough: 'खोकला',
      headache: 'डोकेदुखी',
      weakness: 'अशक्तपणा',
      stomachPain: 'पोटदुखी',
      analyzeSymptoms: 'लक्षणांचे विश्लेषण करा',
      riskLow: 'कमी धोका',
      riskMedium: 'मध्यम धोका',
      riskHigh: 'जास्त धोका',
      possibleConditions: 'संभाव्य परिस्थिती',
      whatToDo: 'तुम्ही काय करावे',
      talkToDoctor: 'डॉक्टरांशी बोला',
      nearbyHospitals: 'जवळचे रुग्णालय',
      government: 'सरकारी',
      private: 'खाजगी',
      call: 'कॉल करा',
      directions: 'दिशा',
      freeToUse: 'वापरण्यासाठी मोफत',
      privacyProtected: 'गोपनीयता संरक्षित',
      worksOffline: 'ऑफलाइन काम करते',
      whyDifferent: 'सेवा हेल्थ AI का वेगळे आहे',
      lowBandwidth: 'कमी बँडविड्थ',
      worksOn2G: '2G नेटवर्कवर काम करते',
      localLanguage: 'स्थानिक भाषा',
      hindiMarathiSupport: 'हिंदी, मराठी समर्थन',
      aiTriage: 'AI ट्रायज',
      smartRiskAssessment: 'स्मार्ट जोखीम मूल्यांकन',
      govtIntegration: 'सरकारी एकीकरण',
      ayushmanBharatReady: 'आयुष्मान भारत तयार',
      ruralFirst: 'ग्रामीण-प्रथम',
      builtForVillages: 'गावांसाठी बनवले',
      bridgeQuote: 'आम्ही हॉस्पिटल अॅप बनवले नाही. आम्ही ग्रामीण भारत आणि आरोग्यसेवा यांच्यात एक पूल बांधला.',
      designedFor600M: 'मर्यादित डिजिटल साक्षरता असलेल्या 600+ दशलक्ष ग्रामीण भारतीयांसाठी डिझाइन केलेले'
    }
  }

  const t = (key) => translations[language][key] || key

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}