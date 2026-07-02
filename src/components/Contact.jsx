import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    details: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', form)
  }

  return (
    <section id="contact">
      <div className="contact-left reveal">
        <div className="contact-label">Get in touch</div>
        <h2 className="contact-title">Let's talk about your project.</h2>
        <p className="contact-desc">Tell us what you're building. We'll get back to you within 24 hours with a clear plan and honest scope.</p>
        <div className="contact-info">
          <div className="contact-row">
            <span>Email</span>
            <span>contact@veeniac.in</span>
          </div>
          <div className="contact-row">
            <span>Web</span>
            <span>veeniac.in</span>
          </div>
          <div className="contact-row">
            <span>Response</span>
            <span>Within 24 hours</span>
          </div>
          <div className="contact-row">
            <span>Global</span>
            <span>US · UK · UAE · Europe · AUS</span>
          </div>
        </div>
      </div>
      <form className="contact-right reveal" onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-field" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-field" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Service needed</label>
          <select className="form-select" name="service" value={form.service} onChange={handleChange}>
            <option value="" disabled>Select a service</option>
            <option>Custom Website Development</option>
            <option>Business Dashboard & BI</option>
            <option>AI Automation & Workflow</option>
            <option>Multiple Services</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Budget</label>
          <input className="form-field" type="text" name="budget" placeholder="e.g. $500 – $1,000" value={form.budget} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Project details</label>
          <textarea className="form-field form-textarea" name="details" placeholder="Tell us about your project..." value={form.details} onChange={handleChange}></textarea>
        </div>
        <button className="submit-btn" type="submit">Send message →</button>
      </form>
    </section>
  )
}
