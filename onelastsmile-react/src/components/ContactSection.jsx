import { useState, useEffect, useRef } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('active')
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    }
    return () => obs.disconnect()
  }, [])

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setStatus('loading')

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_MESSAGE_ID

    if (!window.emailjs) {
      setStatus('error')
      return
    }

    window.emailjs.send(serviceID, templateID, {
      message_type: 'Portfolio Contact',
      source: 'Portfolio',
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    }).then(
      () => setStatus('success'),
      (err) => {
        console.error(err)
        setStatus('error')
      }
    )
  }

  return (
    <section className="contact-section" id="contact" ref={sectionRef} style={{ padding: '100px 5%', background: 'var(--bg-dark)' }}>
      <div className="contact-container reveal" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '10px' }}>Get In Touch</h2>
        <p style={{ opacity: 0.7, marginBottom: '40px' }}>Leave a message below.</p>
        
        {status === 'success' ? (
          <div style={{ padding: '40px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', animation: 'fadeInUp 0.8s ease' }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>Message Sent</h3>
            <p style={{ opacity: 0.8 }}>Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', animation: 'fadeInUp 0.8s ease' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8, fontSize: '0.9rem' }}>Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'}
                style={{ width: '100%', padding: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8, fontSize: '0.9rem' }}>Email</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} disabled={status === 'loading'}
                style={{ width: '100%', padding: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', opacity: 0.8, fontSize: '0.9rem' }}>Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} disabled={status === 'loading'} rows="5"
                style={{ width: '100%', padding: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none', transition: 'border-color 0.3s', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              ></textarea>
            </div>
            {status === 'error' && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'loading'}
              style={{
                marginTop: '10px',
                padding: '16px 30px',
                background: status === 'loading' ? 'transparent' : 'var(--primary-color)',
                border: status === 'loading' ? '1px solid var(--primary-color)' : 'none',
                color: '#fff',
                borderRadius: '30px',
                cursor: status === 'loading' ? 'wait' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                opacity: status === 'loading' ? 0.7 : 1
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
