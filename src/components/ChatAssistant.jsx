import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    id: 'intent',
    bot: () => 'Welcome to the Veeniac build desk. What are you trying to shape?',
    type: 'chips',
    options: ['Build a custom product', 'Explore Invixy', 'Dashboard or AI workflow', 'Not sure yet'],
  },
  {
    id: 'name',
    bot: () => 'Good place to start. What should we call you?',
    type: 'text',
    placeholder: 'Type your name',
  },
  {
    id: 'email',
    bot: (a) => `Nice to meet you, ${a.name}. What email should we reply to?`,
    type: 'email',
    placeholder: 'you@company.com',
  },
  {
    id: 'budget',
    bot: () => 'What budget range are you considering?',
    type: 'chips',
    options: ['$500 - $1,000', '$1,000 - $5,000', '$5,000+', 'Need guidance'],
  },
  {
    id: 'details',
    bot: () => 'Last bit: describe the workflow, product, or business problem in a few words.',
    type: 'text',
    placeholder: 'A few words about the project',
    skippable: true,
  },
  {
    id: 'done',
    bot: (a) => `Ready, ${a.name}. You are interested in "${a.intent}" with a budget of ${a.budget}. Send this brief to our inbox and we will reply at ${a.email}.`,
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
    }, 520 + Math.random() * 320)
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
        { from: 'bot', text: 'That email does not look right yet. Try one more time?' },
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
    const next = { ...answers, [step.id]: '-' }
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
    const subject = `Project inquiry from ${answers.name || 'Website lead'}`
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
          <div className="chat-title">Veeniac Build Desk</div>
          <div className="chat-status">Ready for a brief</div>
        </div>
        {onClose && (
          <button type="button" className="chat-close" aria-label="Close chat" onClick={onClose}>x</button>
        )}
      </div>
      <div className="chat-messages" ref={messagesRef}>
        {messages.map((m, i) => (
          <div className={`chat-msg ${m.from}`} key={i}>{m.text}</div>
        ))}
        {typing && (
          <div className="chat-typing" aria-label="Assistant is typing">
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
          <button type="submit" className="chat-send" aria-label="Send">-&gt;</button>
        </form>
      )}
      {step && !typing && step.type === 'final' && (
        <div className="chat-final">
          <a href={mailtoHref()} className="chat-mailto">Send brief</a>
          <button type="button" className="chat-restart" onClick={restart}>Start over</button>
        </div>
      )}
    </div>
  )
}
