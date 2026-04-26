import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import logoIcon from '../../assets/logo.png'
import './Navbar.css'

const LOGIN_URL    = import.meta.env.VITE_LOGIN_URL        || 'https://login.codexclear.com/login'
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL     || 'https://login.codexclear.com/register'
const INVOICE_URL  = import.meta.env.VITE_INVOICE_APP_URL  || 'https://login.codexclear.com/login?app=invoice'
const MUSIC_URL    = import.meta.env.VITE_MUSIC_APP_URL    || 'https://login.codexclear.com/login?app=music'

const THEMES = [
  { key: 'default', label: 'Deep Navy',     swatch: 'swatch--navy'   },
  { key: 'aurora',  label: 'Purple Aurora', swatch: 'swatch--aurora' },
  { key: 'arctic',  label: 'Arctic Light',  swatch: 'swatch--arctic' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobSub,     setMobSub]     = useState(null)
  const [themeOpen,  setThemeOpen]  = useState(false)
  const themeRef = useRef(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobSub(null)
    setThemeOpen(false)
    document.body.style.overflow = ''
  }, [location])

  // Close theme panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : ''
      return next
    })
    setMobSub(null)
  }, [])

  const activeClass = ({ isActive }) => (isActive ? 'active' : undefined)

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="navbar__inner">

          {/* Brand — takes left, margin-right:auto pushes rest to the right */}
          <Link to="/" className="navbar__brand" aria-label="CodeXClear home">
            <img src={logoIcon} alt="" className="navbar__logo" aria-hidden="true" />
            <span className="navbar__name">
              Code<span className="x">X</span>Clear
            </span>
          </Link>

          {/* ── DESKTOP MENU (hidden on ≤991px via CSS) ── */}
          <ul className="navbar__menu" role="menubar">
            <li role="none">
              <NavLink to="/" end className={activeClass} role="menuitem">Home</NavLink>
            </li>

            <li role="none">
              <NavLink to="/services" className={activeClass} role="menuitem">
                Services <span className="chevron">▾</span>
              </NavLink>
              <div className="dropdown dropdown--mega" role="menu">
                <div className="mega-col">
                  <div className="mega-heading">IT Services</div>
                  {[
                    ['💼','IT Consulting',       'Strategy & architecture',  '/services#consulting'],
                    ['⚙️','Software Engineering','Angular + .NET Core',      '/services#development'],
                    ['☁️','Cloud & DevOps',       'AWS, Azure, CI/CD',        '/services#cloud'],
                    ['🔒','Cybersecurity',        'Audits & compliance',      '/services#security'],
                  ].map(([icon, label, desc, to]) => (
                    <NavLink key={label} to={to} role="menuitem">
                      <span className="dd-icon">{icon}</span>
                      <span>
                        <span className="dd-label">{label}</span>
                        <span className="dd-desc">{desc}</span>
                      </span>
                    </NavLink>
                  ))}
                </div>
                <div className="mega-col">
                  <div className="mega-heading">Enterprise</div>
                  {[
                    ['🏢','ERP Solutions',   'Business management',  '/services#erp'],
                    ['🔗','API Integration', 'Connect your systems', '/services#integration'],
                    ['🛡️','Managed Support', '24/7 monitoring',      '/services#support'],
                    ['🎓','Training',        'Upskill your team',    '/services#training'],
                  ].map(([icon, label, desc, to]) => (
                    <NavLink key={label} to={to} role="menuitem">
                      <span className="dd-icon">{icon}</span>
                      <span>
                        <span className="dd-label">{label}</span>
                        <span className="dd-desc">{desc}</span>
                      </span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </li>

            <li role="none">
              <NavLink to="/products" className={activeClass} role="menuitem">
                Products <span className="chevron">▾</span>
              </NavLink>
              <div className="dropdown" style={{ minWidth: 260 }} role="menu">
                <a href={INVOICE_URL} target="_blank" rel="noopener noreferrer" role="menuitem">
                  <span className="dd-icon">🧾</span>
                  <span>
                    <span className="dd-label">Invoice Manager</span>
                    <span className="dd-desc">Live · Angular + .NET</span>
                  </span>
                </a>
                <a href={MUSIC_URL} target="_blank" rel="noopener noreferrer" role="menuitem">
                  <span className="dd-icon">🎵</span>
                  <span>
                    <span className="dd-label">Music App</span>
                    <span className="dd-desc">Free · Beta</span>
                  </span>
                </a>
                <hr className="dd-divider" />
                {[
                  ['💍','Shadi Portal',  '/products#shadi'],
                  ['🚗','CX Ride',       '/products#ride'],
                  ['🏷️','CX Classifieds','/products#olex'],
                  ['🏠','CX Housing',   '/products#housing'],
                ].map(([icon, label, to]) => (
                  <NavLink key={label} to={to} role="menuitem">
                    <span className="dd-icon">{icon}</span>
                    <span>
                      <span className="dd-label">{label}</span>
                      <span className="dd-desc">Coming Soon</span>
                    </span>
                  </NavLink>
                ))}
              </div>
            </li>

            <li role="none"><NavLink to="/about"   className={activeClass} role="menuitem">About</NavLink></li>
            <li role="none"><NavLink to="/blog"    className={activeClass} role="menuitem">Blog</NavLink></li>
            <li role="none"><NavLink to="/contact" className={activeClass} role="menuitem">Contact</NavLink></li>
          </ul>

          {/* ── DESKTOP ACTIONS (hidden on ≤991px via CSS) ── */}
          <div className="navbar__actions" aria-label="Account actions">
            {/* Theme switcher — desktop only */}
            <div className="theme-switcher" ref={themeRef}>
              <button
                className="theme-toggle"
                onClick={() => setThemeOpen(o => !o)}
                aria-label="Change colour theme"
                aria-expanded={themeOpen}
                aria-haspopup="listbox"
              >
                🎨
              </button>
              {themeOpen && (
                <div className="theme-panel" role="listbox" aria-label="Theme options">
                  <div className="theme-panel__title">Choose Theme</div>
                  {THEMES.map(t => (
                    <button
                      key={t.key}
                      className={`theme-btn${theme === t.key ? ' active' : ''}`}
                      onClick={() => { setTheme(t.key); setThemeOpen(false) }}
                      role="option"
                      aria-selected={theme === t.key}
                    >
                      <span className={`swatch ${t.swatch}`} />
                      {t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={LOGIN_URL}
              target="_blank" rel="noopener noreferrer"
              className="nav-btn-ghost"
            >
              Sign In
            </a>
            <a
              href={REGISTER_URL}
              target="_blank" rel="noopener noreferrer"
              className="nav-btn-fill"
            >
              Get Started
            </a>
          </div>

          {/* ── HAMBURGER (shown on ≤991px via CSS) ──
              ALWAYS rendered, ALWAYS last child in flex row.
              Never hidden by display:none from parent — it controls itself.
          */}
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            type="button"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          🏠 &nbsp;Home
        </NavLink>

        {/* Services accordion */}
        <div className="mob-group">
          <div
            className="mob-toggle"
            onClick={() => setMobSub(s => s === 'services' ? null : 'services')}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setMobSub(s => s === 'services' ? null : 'services')}
            aria-expanded={mobSub === 'services'}
          >
            Services
            <span>{mobSub === 'services' ? '▴' : '▾'}</span>
          </div>
          <div className={`mob-sub${mobSub === 'services' ? ' open' : ''}`}>
            {[
              ['/services#consulting',  '💼', 'IT Consulting'],
              ['/services#development', '⚙️', 'Software Engineering'],
              ['/services#cloud',       '☁️', 'Cloud & DevOps'],
              ['/services#erp',         '🏢', 'ERP Solutions'],
              ['/services#security',    '🔒', 'Cybersecurity'],
            ].map(([to, icon, label]) => (
              <NavLink key={label} to={to} onClick={() => setMobileOpen(false)}>
                <span>{icon}</span> {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Products accordion */}
        <div className="mob-group">
          <div
            className="mob-toggle"
            onClick={() => setMobSub(s => s === 'products' ? null : 'products')}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setMobSub(s => s === 'products' ? null : 'products')}
            aria-expanded={mobSub === 'products'}
          >
            Products
            <span>{mobSub === 'products' ? '▴' : '▾'}</span>
          </div>
          <div className={`mob-sub${mobSub === 'products' ? ' open' : ''}`}>
            <a href={INVOICE_URL} target="_blank" rel="noopener noreferrer">
              <span>🧾</span> Invoice Manager
            </a>
            <a href={MUSIC_URL} target="_blank" rel="noopener noreferrer">
              <span>🎵</span> Music App
            </a>
            <NavLink to="/products#shadi" onClick={() => setMobileOpen(false)}><span>💍</span> Shadi Portal</NavLink>
            <NavLink to="/products#ride"  onClick={() => setMobileOpen(false)}><span>🚗</span> CX Ride</NavLink>
            <NavLink to="/products"       onClick={() => setMobileOpen(false)}><span>📦</span> All Products</NavLink>
          </div>
        </div>

        {/* Flat links */}
        {[
          ['/about',   '👥', 'About'],
          ['/blog',    '📝', 'Blog'],
          ['/contact', '✉️', 'Contact'],
        ].map(([to, icon, label]) => (
          <NavLink
            key={to} to={to}
            className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {icon} &nbsp;{label}
          </NavLink>
        ))}

        <hr className="divider" style={{ margin: '0.75rem 0' }} />

        {/* Theme switcher in drawer */}
        <div className="mob-theme-label">Choose Theme</div>
        <div className="mob-theme-row">
          {THEMES.map(t => (
            <button
              key={t.key}
              className={`theme-btn${theme === t.key ? ' active' : ''}`}
              onClick={() => setTheme(t.key)}
              aria-pressed={theme === t.key}
            >
              <span className={`swatch ${t.swatch}`} />
              {t.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Auth CTAs */}
        <div className="mob-actions">
          <a
            href={LOGIN_URL} target="_blank" rel="noopener noreferrer"
            className="nav-btn-ghost"
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </a>
          <a
            href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
            className="nav-btn-fill"
            onClick={() => setMobileOpen(false)}
          >
            Register Free
          </a>
        </div>
      </div>

      {/* Backdrop overlay on mobile */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={toggleMobile}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,.4)',
            zIndex: 998,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  )
}
