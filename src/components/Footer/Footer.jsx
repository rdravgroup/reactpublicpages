import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { subscribeNewsletter } from '../../utils/contactApi.js'
import logoFull from '../../assets/logo-full.png'
import './Footer.css'

const INVOICE_URL = import.meta.env.VITE_INVOICE_APP_URL || 'https://login.codexclear.com/login?app=invoice'
const MUSIC_URL   = import.meta.env.VITE_MUSIC_APP_URL   || 'https://login.codexclear.com/login?app=music'

const SOCIALS = [
  { icon: '𝕏',  label: 'Twitter / X' },
  { icon: 'in', label: 'LinkedIn'     },
  { icon: '⌥',  label: 'GitHub'       },
  { icon: '▶',  label: 'YouTube'      },
  { icon: '💬', label: 'WhatsApp'     },
]

export default function Footer() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'err'
  const [msg,    setMsg]    = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('err'); setMsg('Please enter a valid email address.'); return
    }
    setStatus('loading')
    try {
      const m = await subscribeNewsletter(email)
      setStatus('ok'); setMsg(m); setEmail('')
    } catch (err) {
      setStatus('err'); setMsg(err.message || 'Something went wrong.')
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* Brand */}
          <div>
            <Link to="/" aria-label="CodeXClear home">
              <img src={logoFull} alt="CodeXClear" className="footer__logo" />
            </Link>
            <p className="footer__tagline">
              Modern IT services and digital products — delivered with clarity from Lucknow, UP, India.<br />
              <a href="tel:+918400087325">+91-8400087325</a>
              {' · '}
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a>
              {' · '}
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a>
            </p>
            <div className="footer__socials">
              {SOCIALS.map(s => (
                <span key={s.label} className="social-ic" title={s.label} role="img" aria-label={s.label}>{s.icon}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className="footer__heading">Services</h6>
            <ul className="footer__links">
              <li><NavLink to="/services#consulting">IT Consulting</NavLink></li>
              <li><NavLink to="/services#development">Engineering</NavLink></li>
              <li><NavLink to="/services#cloud">Cloud &amp; DevOps</NavLink></li>
              <li><NavLink to="/services#erp">ERP Solutions</NavLink></li>
              <li><NavLink to="/services#security">Cybersecurity</NavLink></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h6 className="footer__heading">Products</h6>
            <ul className="footer__links">
              <li><a href={INVOICE_URL}>Invoice Manager</a></li>
              <li><a href={MUSIC_URL}>Music App</a></li>
              <li><NavLink to="/products#shadi">Shadi Portal</NavLink></li>
              <li><NavLink to="/products#ride">CX Ride</NavLink></li>
              <li><NavLink to="/products">All Products</NavLink></li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h6 className="footer__heading">Quick Contact</h6>
            <address className="footer__address">
              KH179 Anand Puram, STP Chauraha<br />
              Gomtinagar Extension<br />
              Lucknow – 226010, UP, India<br />
              <a href="tel:+918400087325">+91-8400087325</a><br />
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a><br />
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a><br />
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a><br />
              <a href="mailto:sanju27586@gmail.com">sanju27586@gmail.com</a>
            </address>

            <h6 className="footer__heading" style={{ marginTop: '1.5rem' }}>Stay Updated</h6>
            <form className="newsletter-row" onSubmit={handleSubscribe} noValidate>
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus(null) }}
                aria-label="Email for newsletter"
                disabled={status === 'loading' || status === 'ok'}
              />
              <button type="submit" className="btn btn-grad btn-sm" disabled={status === 'loading' || status === 'ok'}>
                {status === 'loading' ? '…' : status === 'ok' ? '✓' : 'Subscribe'}
              </button>
            </form>
            {status === 'ok'  && <p className="sub-ok">✓ {msg}</p>}
            {status === 'err' && <p className="sub-err">⚠ {msg}</p>}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2025 CodeXClear.com · All rights reserved. · Lucknow, UP, India</p>
          <div className="footer__legal">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
