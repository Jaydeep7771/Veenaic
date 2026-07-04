import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    id: 'intent',
    bot: () => "Hi! 👋 I'm the Veeniac assistant. What brings you here today?",
    type: 'chips',
    options: ['Build a custom product', 'Explore Invixy', 'Dashboards & AI automation', 'Something else'],
  },
  {
    id: 'name',
    bot: () => "Great — I can help with that. What's your name?",
    type: 'text',
    placeholder: 'Type your name…',
  },
  {
    id: 'email',
    bot: (a) => `Nice to meet you, ${a.name}! What's the best email to reach you at?`,
    type: 'email',
    placeholder: 'you@company.com',
  },
  {
    id: 'budget',
    bot: () => 'And what budget range are you working with?',
    type: 'chips',
    options: ['$500 – $1,000', '$1,000 – $5,000', '$5,000+', 'Not sure yet'],
  },
  {
    id: 'details',
    bot: () => 'Last one — tell me a bit about your project, or just skip this.',
    type: 'text',
    placeholder: 'A few words about your project…',
    skippable: true,
  },
  {
    id: 'done',
    bot: (a) => `Perfect, ${a.name}! ✅ You're interested in "${a.intent}" with a budget of ${a.budget}. Our team will reply at ${a.email} within 24 hours — or send it straight to our inbox now:`,
    type: 'final',
  },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ChatAssistant({ onClose }) {
  const [messages, setMessages] = useState([])
  const [stepIndex, setStepIndex] = useState(-1)
  const [answers, setAnswers] = useState({})
  const [typing, setTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesRef = useRef(null)
  const timerRef = useRef(null)

  const pushBot = (index, currentAnswers) => {
    setTyping(true)
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: steps[index].bot(currentAnswers) }])
      setTyping(false)
      setStepIndex(index)
    }, 650 + Math.random() * 450)
  }

  useEffect(() => {
    pushBot(0, {})
    return () => clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const step = stepIndex >= 0 ? steps[stepIndex] : null

  const answer = (text) => {
    if (!step || typing) return
    if (step.type === 'email' && !EMAIL_RE.test(text)) {
      setMessages((m) => [
        ...m,
        { from: 'user', text },
        { from: 'bot', text: "Hmm, that doesn't look like a valid email — mind double-checking it?" },
      ])
      setInputValue('')
      return
    }
    const next = { ...answers, [step.id]: text }
    setAnswers(next)
    setMessages((m) => [...m, { from: 'user', text }])
    setInputValue('')
    if (stepIndex + 1 < steps.length) pushBot(stepIndex + 1, next)
  }

  const skip = () => {
    if (!step || typing) return
    const next = { ...answers, [step.id]: '—' }
    setAnswers(next)
    setMessages((m) => [...m, { from: 'user', text: 'Skip for now' }])
    if (stepIndex + 1 < steps.length) pushBot(stepIndex + 1, next)
  }

  const restart = () => {
    clearTimeout(timerRef.current)
    setMessages([])
    setAnswers({})
    setInputValue('')
    setStepIndex(-1)
    pushBot(0, {})
  }

  const mailtoHref = () => {
    const subject = `Project inquiry — ${answers.name || 'Website lead'}`
    const body = [
      `Name: ${answers.name || ''}`,
      `Email: ${answers.email || ''}`,
      `Interested in: ${answers.intent || ''}`,
      `Budget: ${answers.budget || ''}`,
      `Details: ${answers.details || ''}`,
    ].join('\n')
    return `mailto:contact@veeniac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const v = inputValue.trim()
    if (v) answer(v)
  }

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <div className="chat-avatar">V</div>
        <div>
          <div className="chat-title">Veeniac Assistant</div>
          <div className="chat-status">Online — replies instantly</div>
        </div>
        {onClose && (
          <button type="button" className="chat-close" aria-label="Close chat" onClick={onClose}>×</button>
        )}
      </div>
      <div className="chat-messages" ref={messagesRef}>
        {messages.map((m, i) => (
          <div className={`chat-msg ${m.from}`} key={i}>{m.text}</div>
        ))}
        {typing && (
          <div className="chat-typing">
            <span></span><span></span><span></span>
          </div>
        )}
      </div>
      {step && !typing && step.type === 'chips' && (
        <div className="chat-chips">
          {step.options.map((opt) => (
            <button type="button" className="chat-chip" key={opt} onClick={() => answer(opt)}>{opt}</button>
          ))}
        </div>
      )}
      {step && !typing && (step.type === 'text' || step.type === 'email') && (
        <form className="chat-input-row" onSubmit={onSubmit}>
          <input
            className="chat-input"
            type={step.type === 'email' ? 'email' : 'text'}
            placeholder={step.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          {step.skippable && (
            <button type="button" className="chat-skip" onClick={skip}>Skip</button>
          )}
          <button type="submit" className="chat-send" aria-label="Send">→</button>
        </form>
      )}
      {step && !typing && step.type === 'final' && (
        <div className="chat-final">
          <a href={mailtoHref()} className="chat-mailto">Send to our inbox →</a>
          <button type="button" className="chat-restart" onClick={restart}>Start over</button>
        </div>
      )}
    </div>
  )
}
