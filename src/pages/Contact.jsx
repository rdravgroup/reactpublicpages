import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import { validateContact } from '../utils/validation.js'
import { sendContactForm, getServiceList } from '../utils/contactApi.js'
import { usePrivacyModal } from '../context/PrivacyModalContext.jsx'
import './Contact.css'

const COUNTRY_CODES = [
  { code:'+91', label:'India (+91)' },
  { code:'+1',  label:'USA (+1)' },
  { code:'+44', label:'UK (+44)' },
  { code:'+61', label:'Australia (+61)' },
  { code:'+971', label:'UAE (+971)' },
  { code:'other', label:'Other (enter number)' },
]

const INIT = { name:'', email:'', countryCode:'+91', phone:'', service:'', message:'', agreed:false }

function Field({ id, label, error, valid, optional, children }) {
  return (
    <div className={`mat-field${error?' has-error':valid?' is-valid':''}`}>
      {children}
      <label htmlFor={id}>{label}{!optional&&' *'}</label>
      {error && <span className="field-error" role="alert">{error}</span>}
    </div>
  )
}

export default function Contact() {
  usePageReveal()
  const { showPrivacy } = usePrivacyModal()
  const [form,    setForm]    = useState(INIT)
  const [services, setServices] = useState([])
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [status,  setStatus]  = useState('idle') // idle|loading|success|error
  const [apiErr,  setApiErr]  = useState('')
  const formRef = useRef(null)

  /* Real-time validation for touched fields */
  useEffect(() => {
    if (!Object.keys(touched).length) return
    const all = validateContact(form)
    const partial = {}
    Object.keys(all).forEach(k => { if (touched[k]) partial[k] = all[k] })
    setErrors(partial)
  }, [form, touched])

  /* keep service select floating label */
  useEffect(() => {
    formRef.current?.querySelector('select[name="service"]')?.classList.toggle('has-value', !!form.service)
  }, [form.service])

  /* load services from backend */
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const list = await getServiceList()
        if (mounted) setServices(list || [])
      } catch (err) {
        // silent - optionally show a non-blocking message
        console.error('Failed to load services', err)
      }
    })()
    return () => { mounted = false }
  }, [])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const onBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }))
  const isValid = f => touched[f] && !errors[f] && (form[f] !== '' && form[f] !== false)

  const handleSubmit = async e => {
    e.preventDefault()
    const allTouched = Object.fromEntries(Object.keys(form).map(k=>[k,true]))
    setTouched(allTouched)
    const allErrors = validateContact(form)
    setErrors(allErrors)
    if (Object.keys(allErrors).length) {
      formRef.current?.querySelector('.has-error')?.scrollIntoView({ behavior:'smooth', block:'center' })
      return
    }
    setStatus('loading'); setApiErr('')
    try {
      await sendContactForm(form)
      setStatus('success'); setForm(INIT); setTouched({}); setErrors({})
    } catch (err) {
      setStatus('error'); setApiErr(err.message || 'Failed to send. Please try again or call us directly.')
    }
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div className="section-eyebrow reveal" style={{ display:'inline-block', marginBottom:'1rem' }}>Get In Touch</div>
          <h1 className="page-hero__title reveal delay-1">Contact <span className="grad-text">CodeXClear</span></h1>
          <p className="page-hero__sub reveal delay-2">Have a project in mind? Need IT consulting? We reply within 24 hours.</p>
          <ul className="breadcrumb reveal delay-3"><li><Link to="/">Home</Link></li><li>·</li><li>Contact</li></ul>
        </div>
      </section>

      {/* Info cards */}
      <section className="section" style={{ paddingBottom:0 }}>
        <div className="container">
          <div className="info-grid">
            <div className="card reveal text-center">
              <div style={{ fontSize:'2rem', marginBottom:'.75rem' }}>📞</div>
              <h5 className="card-title">Call / WhatsApp</h5>
              <a href="tel:+918400087325" className="info-link">+91-8400087325</a>
              <p style={{ fontSize:'.78rem', color:'var(--text-muted)', marginTop:'.3rem' }}>Mon–Sat, 9am–7pm IST</p>
            </div>
            <div className="card reveal delay-1 text-center">
              <div style={{ fontSize:'2rem', marginBottom:'.75rem' }}>✉️</div>
              <h5 className="card-title">Email</h5>
              <a href="mailto:myavi2005@gmail.com" className="info-link">myavi2005@gmail.com</a>
              <a href="mailto:myavi2005@gmail.com" className="info-link" style={{ display:'block' }}>myavi2005@gmail.com</a>
            </div>
            <div className="card reveal delay-2 text-center">
              <div style={{ fontSize:'2rem', marginBottom:'.75rem' }}>🏢</div>
              <h5 className="card-title">Address</h5>
              <p style={{ fontSize:'.82rem', color:'var(--text-secondary)', lineHeight:1.75 }}>KH179 Anand Puram, STP Chauraha<br />Gomtinagar Extension<br />Lucknow – 226010, UP, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="section">
        <div className="container">
          <div className="contact-layout">

            {/* Form */}
            <div className="reveal">
              <div className="card" style={{ padding:'2.5rem' }}>
                <div className="section-eyebrow" style={{ marginBottom:'1rem' }}>Send a Message</div>
                <h2 style={{ fontSize:'1.6rem', fontWeight:800, marginBottom:'.5rem', color:'var(--text-primary)' }}>
                  We'll Reply Within <span className="grad-text">24 Hours</span>
                </h2>
                <p style={{ fontSize:'.875rem', color:'var(--text-secondary)', marginBottom:'2rem' }}>Fields marked * are required.</p>

                {status === 'success' ? (
                  <div className="success-box">
                    <div style={{ fontSize:'2.5rem', marginBottom:'.75rem' }}>✅</div>
                    <h3 style={{ fontWeight:700, marginBottom:'.5rem', color:'var(--text-primary)' }}>Message Sent!</h3>
                    <p style={{ color:'var(--text-secondary)', marginBottom:'1.25rem' }}>Our team will get back to you within 24 hours.</p>
                    <button className="btn btn-grad" onClick={() => setStatus('idle')}>Send Another Message</button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    <Field id="name" label="Full Name" error={errors.name} valid={isValid('name')}>
                      <input id="name" name="name" type="text" placeholder=" " autoComplete="name" maxLength={80}
                        value={form.name} onChange={onChange} onBlur={onBlur} />
                    </Field>

                    <Field id="email" label="Email Address" error={errors.email} valid={isValid('email')}>
                      <input id="email" name="email" type="email" placeholder=" " autoComplete="email" inputMode="email" maxLength={33}
                        value={form.email} onChange={onChange} onBlur={onBlur} />
                    </Field>

                    <Field id="countryCode" label="Country Code" error={errors.countryCode} valid={isValid('countryCode')}>
                      <select id="countryCode" name="countryCode" value={form.countryCode} onChange={onChange} onBlur={onBlur}
                        className={form.countryCode ? 'has-value' : ''}>
                        {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                      </select>
                      <span className="select-arrow">▼</span>
                    </Field>

                    <Field id="phone" label="Phone Number" error={errors.phone} valid={isValid('phone')}>
                      <input id="phone" name="phone" type="tel" placeholder=" " autoComplete="tel" inputMode="tel" maxLength={10}
                        value={form.phone} onChange={onChange} onBlur={onBlur} />
                    </Field>

                    {/* Company field removed — not required for backend */}

                    <Field id="service" label="Service of Interest" error={errors.service} valid={isValid('service')}>
                      <select id="service" name="service" value={form.service} onChange={onChange} onBlur={onBlur}
                        className={form.service ? 'has-value' : ''}>
                        <option value="" disabled>Select a service…</option>
                        {services.map(s => (
                          <option key={s.recId ?? s.RecId} value={s.recId ?? s.RecId}>{s.name ?? s.Name}</option>
                        ))}
                      </select>
                      <span className="select-arrow">▼</span>
                    </Field>

                    <Field id="message" label="Your Message" error={errors.message} valid={isValid('message')}>
                      <textarea id="message" name="message" placeholder=" " rows={5} maxLength={2000}
                        value={form.message} onChange={onChange} onBlur={onBlur} />
                    </Field>
                    {form.message && (
                      <div style={{ fontSize:'.72rem', color:'var(--text-muted)', marginTop:'-1.5rem', marginBottom:'1.5rem', textAlign:'right' }}>
                        {form.message.length}/2000
                      </div>
                    )}

                    <div className={`check-row${errors.agreed?' check-row--error':''}`}>
                      <input type="checkbox" id="agreed" name="agreed" checked={form.agreed}
                        onChange={onChange} onBlur={onBlur}
                        style={{ accentColor:'var(--accent-1)', width:16, height:16, marginTop:2, flexShrink:0 }} />
                      <label htmlFor="agreed" style={{ fontSize:'.82rem', color:'var(--text-secondary)', cursor:'pointer' }}>
                        I agree to the{' '}
                        <a href="#" onClick={(e)=>{ e.preventDefault(); showPrivacy() }} style={{ color:'var(--accent-1)' }}>Privacy Policy</a>{' '}
                        and consent to being contacted by CodeXClear.
                      </label>
                    </div>
                    {errors.agreed && <p style={{ fontSize:'.72rem', color:'#f44336', marginBottom:'1rem' }} role="alert">{errors.agreed}</p>}

                    {status === 'error' && (
                      <div className="api-error" role="alert">⚠️ {apiErr}</div>
                    )}

                    <button type="submit" className="btn btn-grad submit-btn" disabled={status==='loading'}>
                      {status === 'loading' ? <><span className="spinner" />Sending…</> : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="contact-sidebar reveal delay-1">
              <div className="card" style={{ marginBottom:'1rem' }}>
                <h4 style={{ fontSize:'1.05rem', fontWeight:700, marginBottom:'1.5rem', color:'var(--text-primary)' }}>What Happens Next?</h4>
                {[['1','We review your message','Usually within 2 business hours'],
                  ['2','Discovery call scheduled','30-min free consultation'],
                  ['3','Proposal delivered','Scope, timeline & pricing — no obligation']].map(([n,t,s]) => (
                  <div key={n} style={{ display:'flex', gap:'1rem', marginBottom:'1.25rem', alignItems:'flex-start' }}>
                    <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--grad)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'.85rem', flexShrink:0, color:'#fff' }}>{n}</div>
                    <div><div style={{ fontWeight:600, fontSize:'.875rem', marginBottom:'.2rem', color:'var(--text-primary)' }}>{t}</div><div style={{ fontSize:'.78rem', color:'var(--text-muted)' }}>{s}</div></div>
                  </div>
                ))}
              </div>

              <div className="card direct-card" style={{ textAlign:'center', marginBottom:'1rem' }}>
                <div style={{ fontSize:'2rem', marginBottom:'.75rem' }}>📞</div>
                <h5 style={{ fontWeight:700, marginBottom:'.4rem', color:'var(--text-primary)' }}>Need faster help?</h5>
                <p style={{ fontSize:'.85rem', color:'var(--text-secondary)', marginBottom:'1rem' }}>Call or WhatsApp us directly</p>
                <a href="tel:+918400087325" className="btn btn-grad btn-sm" style={{ width:'100%', justifyContent:'center', display:'flex', marginBottom:'.5rem' }}>📞 +91-8400087325</a>
                <a href="mailto:myavi2005@gmail.com" className="btn btn-outline btn-sm" style={{ width:'100%', justifyContent:'center', display:'flex' }}>✉️ myavi2005@gmail.com</a>
              </div>

              <div className="card">
                <h5 style={{ fontSize:'.9rem', fontWeight:700, marginBottom:'.75rem', color:'var(--text-primary)' }}>📍 Our Location</h5>
                <p style={{ fontSize:'.82rem', color:'var(--text-secondary)', lineHeight:1.85, marginBottom:'1rem' }}>
                  KH179 Anand Puram, STP Chauraha<br />Gomtinagar Extension<br />Lucknow – 226010, UP, India
                </p>
                <div className="map-placeholder">
                  <div className="map-dot" />
                  <span>Lucknow, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
