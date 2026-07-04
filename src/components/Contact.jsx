import { useState } from 'react'

const SERVICE_OPTIONS = [
  'Product website',
  'Dashboard or BI',
  'AI workflow',
  'Internal tool',
  'CRM automation',
]

const BUDGET_OPTIONS = [
  '$500 - $1,000',
  '$1,000 - $5,000',
  '$5,000+',
  'Need guidance',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    budget: BUDGET_OPTIONS[1],
    details: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const updateChoice = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
  }

  const mailtoHref = () => {
    const subject = `Build brief from ${form.name || 'Veeniac website'}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Mission: ${form.service}`,
      `Budget: ${form.budget}`,
      `Project details:`,
      form.details,
    ].join('\n')
    return `mailto:contact@veeniac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('Opening your email client with the brief ready to send.')
    window.location.href = mailtoHref()
  }

  return (
    <section id="contact">
      <div className="contact-left reveal">
        <p className="section-label">Build Brief</p>
        <h2>Tell us where the work is getting stuck.</h2>
        <p className="contact-desc">
          A useful first conversation starts with the workflow, the people
          involved, and the cost of leaving it as-is.
        </p>
        <div className="contact-info">
          <a className="contact-row" href="mailto:contact@veeniac.in">
            <span>Email</span>
            <strong>contact@veeniac.in</strong>
          </a>
          <a className="contact-row" href="https://veeniac.in" target="_blank" rel="noopener noreferrer">
            <span>Web</span>
            <strong>veeniac.in</strong>
          </a>
          <div className="contact-row">
            <span>Response</span>
            <strong>Within 24 hours</strong>
          </div>
          <div className="contact-row">
            <span>Markets</span>
            <strong>US, UK, UAE, Europe, Australia</strong>
          </div>
        </div>
      </div>
      <form className="contact-right reveal" onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input
              className="form-field"
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className="form-field"
              id="email"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Mission</span>
          <div className="choice-grid" role="group" aria-label="Mission">
            {SERVICE_OPTIONS.map((option) => (
              <button
                type="button"
                className={`choice-chip${form.service === option ? ' active' : ''}`}
                key={option}
                onClick={() => updateChoice('service', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <span className="form-label">Budget</span>
          <div className="choice-grid compact" role="group" aria-label="Budget">
            {BUDGET_OPTIONS.map((option) => (
              <button
                type="button"
                className={`choice-chip${form.budget === option ? ' active' : ''}`}
                key={option}
                onClick={() => updateChoice('budget', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="details">Project details</label>
          <textarea
            className="form-field form-textarea"
            id="details"
            name="details"
            placeholder="What are you trying to fix, launch, or automate?"
            value={form.details}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="submit-btn" type="submit">Prepare the brief</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  )
}
