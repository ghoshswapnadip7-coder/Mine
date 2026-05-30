import { useState, useRef, useEffect } from 'react'

export default function OneLastReply() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('idle') // idle, loading, success
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
    if (!formData.message) return
    setStatus('loading')

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_MESSAGE_ID
    
    if (!window.emailjs) {
      setStatus('success')
      return
    }

    window.emailjs.send(serviceID, templateID, {
      message_type: 'One Last Reply',
      source: 'OneLastSmile',
      from_name: formData.name || 'Anonymous',
      reply_to: 'none',
      message: formData.message,
      time: new Date().toLocaleString(),
    }).then(
      () => setStatus('success'),
      () => setStatus('success') // fail silently to maintain emotion
    )
  }

  return (
    <section className="one-last-reply" ref={sectionRef} style={{ padding: '120px 5%', background: '#0a030c', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div className="reveal" style={{ maxWidth: '500px', width: '100%', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 2s ease, transform 2s ease' }}>
        
        {status === 'success' ? (
          <div style={{ animation: 'fadeInUp 2s ease forwards' }}>
            <p style={{ opacity: 0.4, fontStyle: 'italic', fontSize: '1rem', letterSpacing: '1px' }}>Left behind.</p>
          </div>
        ) : (
          <>
            <p style={{ opacity: 0.6, fontSize: '1.1rem', marginBottom: '50px', lineHeight: 1.8 }}>
              If there is anything you never said,<br/>you can leave it here.
            </p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={status === 'loading'} placeholder="Name (Optional)"
                style={{ width: '100%', padding: '15px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.9rem', outline: 'none', textAlign: 'center', transition: 'border-color 1s' }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <textarea required name="message" value={formData.message} onChange={handleChange} disabled={status === 'loading'} placeholder="Your words..." rows="4"
                style={{ width: '100%', padding: '20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', color: '#fff', fontSize: '1rem', outline: 'none', textAlign: 'center', transition: 'border-color 1s', resize: 'none' }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.3)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              ></textarea>
              
              <button type="submit" disabled={status === 'loading'}
                style={{
                  alignSelf: 'center',
                  marginTop: '20px',
                  padding: '12px 35px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.5)',
                  borderRadius: '30px',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  fontSize: '0.85rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  transition: 'all 1s ease',
                  opacity: status === 'loading' ? 0.3 : 1
                }}
                onMouseOver={(e) => { if (status !== 'loading') { e.target.style.color = 'rgba(255,255,255,0.9)'; e.target.style.borderColor = 'rgba(255,255,255,0.4)' } }}
                onMouseOut={(e) => { if (status !== 'loading') { e.target.style.color = 'rgba(255,255,255,0.5)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)' } }}
              >
                {status === 'loading' ? '...' : 'Leave It Behind'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
