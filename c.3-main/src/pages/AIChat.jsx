import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const AIChat = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const isSymptomMode = searchParams.get('mode') === 'symptoms'
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: isSymptomMode 
        ? 'Hello! I\'m here to help you understand your symptoms. Please describe how you\'re feeling in your own words. You can tell me about any pain, discomfort, or changes you\'ve noticed in your body.'
        : 'Hello! I\'m your AI health assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [detectedSymptoms, setDetectedSymptoms] = useState([])
  const messagesEndRef = useRef(null)

  const quickReplies = isSymptomMode ? [
    { text: 'I have fever and headache', icon: '🤒' },
    { text: 'My stomach hurts', icon: '🤢' },
    { text: 'I feel very weak', icon: '😴' },
    { text: 'I have been coughing', icon: '😷' },
    { text: 'I feel dizzy', icon: '😵' },
    { text: 'Get my analysis', icon: '🔍' }
  ] : [
    { text: 'What should I eat?', icon: '🍎' },
    { text: 'Is this serious?', icon: '❓' },
    { text: 'Government schemes', icon: '🏛️' },
    { text: 'Medicine dosage', icon: '💊' },
    { text: 'Exercise advice', icon: '🏃‍♂️' },
    { text: 'Mental health', icon: '🧠' }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const detectSymptomsFromText = (text) => {
    const symptomKeywords = {
      fever: ['fever', 'temperature', 'hot', 'burning', 'bukhar'],
      cough: ['cough', 'coughing', 'khasi'],
      headache: ['headache', 'head pain', 'sir dard', 'migraine'],
      weakness: ['weak', 'tired', 'fatigue', 'kamjori'],
      stomachPain: ['stomach', 'belly', 'abdomen', 'pet dard', 'nausea'],
      bodyAche: ['body ache', 'muscle pain', 'joint pain', 'badan dard'],
      dizziness: ['dizzy', 'lightheaded', 'chakkar']
    }

    const detected = []
    const lowerText = text.toLowerCase()
    
    Object.entries(symptomKeywords).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        if (!detectedSymptoms.includes(symptom)) {
          detected.push(symptom)
        }
      }
    })

    if (detected.length > 0) {
      setDetectedSymptoms(prev => [...prev, ...detected])
    }

    return detected
  }

  const generateSymptomResponse = (userMessage, detectedSymptoms) => {
    if (userMessage.toLowerCase().includes('get my analysis') || userMessage.toLowerCase().includes('analyze')) {
      if (detectedSymptoms.length === 0) {
        return 'I haven\'t detected any specific symptoms from our conversation yet. Could you please describe how you\'re feeling? For example, do you have fever, pain, or any discomfort?'
      }

      // Generate analysis and redirect
      setTimeout(() => {
        sessionStorage.setItem('symptoms', JSON.stringify({
          selected: detectedSymptoms,
          additional: `Symptoms described in chat: ${messages.filter(m => m.type === 'user').map(m => m.content).join('. ')}`,
          source: 'ai-chat'
        }))
        navigate('/result')
      }, 2000)

      return `Based on our conversation, I've detected these symptoms: ${detectedSymptoms.map(s => s.replace(/([A-Z])/g, ' $1').trim()).join(', ')}.\n\nI'm now analyzing your symptoms and will show you a detailed health assessment. Please wait a moment...`
    }

    const responses = {
      'fever': 'I understand you have fever. This could indicate your body is fighting an infection. Are you experiencing any other symptoms like headache, body ache, or weakness? Also, have you measured your temperature?',
      'headache': 'Headaches can have various causes - from stress to dehydration to infections. Is it a throbbing pain or constant ache? Are you also feeling nauseous or sensitive to light?',
      'stomach': 'Stomach pain can be concerning. Is it a sharp pain or dull ache? Are you also experiencing nausea, vomiting, or changes in bowel movements? When did this start?',
      'cough': 'I see you have a cough. Is it a dry cough or are you bringing up phlegm? Do you have fever along with it? Coughs can be due to infections, allergies, or other causes.',
      'weakness': 'Feeling weak can be due to many reasons - from not eating enough to infections to other health conditions. Are you also having fever, or have you been eating and drinking normally?',
      'default': 'I understand. Can you tell me more about when these symptoms started and how severe they are? Any other symptoms you\'ve noticed? The more details you provide, the better I can help assess your condition.'
    }

    // Find relevant response based on detected symptoms
    for (const symptom of detectedSymptoms) {
      if (responses[symptom]) {
        return responses[symptom]
      }
    }

    return responses.default
  }

  const generateAIResponse = (userMessage) => {
    if (isSymptomMode) {
      const newSymptoms = detectSymptomsFromText(userMessage)
      return generateSymptomResponse(userMessage, [...detectedSymptoms, ...newSymptoms])
    }

    // Regular chat responses
    const responses = {
      'what should i eat': 'For general health, focus on:\n• Fresh fruits and vegetables\n• Whole grains like brown rice, wheat\n• Plenty of water (8-10 glasses daily)\n• Avoid processed foods\n• Include protein sources like dal, eggs',
      'is this serious': 'Based on common symptoms, most conditions are manageable. However:\n• High fever (>101°F) needs medical attention\n• Difficulty breathing requires immediate care\n• Persistent symptoms for >3 days should be checked\n• Trust your instincts - seek help if worried',
      'government schemes': 'Available healthcare schemes:\n• Ayushman Bharat (₹5 lakh coverage)\n• State health insurance programs\n• Free medicines at government hospitals\n• Janani Suraksha Yojana (maternal health)\n• Visit nearest PHC for enrollment',
      'medicine dosage': 'Important medicine guidelines:\n• Always follow doctor\'s prescription\n• Complete the full course of antibiotics\n• Take medicines with food if advised\n• Never share medicines with others\n• Check expiry dates before use',
      'exercise advice': 'Simple daily exercises:\n• 30 minutes walking daily\n• Basic stretching in morning\n• Yoga or breathing exercises\n• Avoid heavy exercise when sick\n• Stay hydrated during activity',
      'mental health': 'Mental health is important:\n• Talk to family/friends about concerns\n• Practice deep breathing for stress\n• Maintain regular sleep schedule\n• Seek professional help if needed\n• Call mental health helpline: 9152987821'
    }

    const key = userMessage.toLowerCase()
    return responses[key] || 'I understand your concern. For specific medical advice, I recommend consulting with a healthcare professional. In the meantime, ensure you\'re getting adequate rest, staying hydrated, and monitoring your symptoms. Is there anything specific you\'d like to know about general health and wellness?'
  }

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'en-IN'
      recognition.continuous = false
      recognition.interimResults = false

      setIsListening(true)
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        alert('Voice recognition not available. Please type your message.')
      }

      recognition.start()
    } else {
      alert('Voice recognition not supported in this browser')
    }
  }

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(messageText),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-mint-cream flex flex-col">
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  {isSymptomMode ? 'AI Symptom Assistant' : 'AI Health Assistant'}
                </h1>
                <p className="text-sm text-green-600">
                  {isSymptomMode ? 'Analyzing your symptoms...' : 'Online'}
                </p>
              </div>
            </div>
            
            {/* Detected Symptoms Badge */}
            {isSymptomMode && detectedSymptoms.length > 0 && (
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <span className="text-xs text-green-800 font-medium">
                  {detectedSymptoms.length} symptom{detectedSymptoms.length !== 1 ? 's' : ''} detected
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-500 text-sm">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Replies */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-3 max-w-2xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => sendMessage(reply.text)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                <span>{reply.icon}</span>
                <span className="text-sm">{reply.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-4 max-w-2xl">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isSymptomMode ? "Describe how you're feeling..." : "Type your health question..."}
                className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={startVoiceInput}
              disabled={isListening}
              className={`p-3 rounded-xl transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <span className="text-xl">{isListening ? '🔴' : '🎤'}</span>
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={!inputMessage.trim()}
              className={`p-3 rounded-xl transition-colors ${
                inputMessage.trim()
                  ? 'bg-primary text-white hover:bg-green-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="text-xl">📤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIChat