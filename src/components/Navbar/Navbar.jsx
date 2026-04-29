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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setMobSub(null); setThemeOpen(false)
    document.body.style.overflow = ''
  }, [location])

  useEffect(() => {
    const handler = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) setThemeOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
    setMobSub(null)
  }, [])

  const active = ({ isActive }) => isActive ? 'active' : undefined

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="navbar__inner">

          {/* ── BRAND (margin-right:auto pushes everything else right) ── */}
          <Link to="/" className="navbar__brand" aria-label="CodeXClear home">
            <img src={logoIcon} alt="CodeXClear" className="navbar__logo" />
            <span className="navbar__name">Code<span className="x">X</span>Clear</span>
          </Link>

          {/* ── DESKTOP MENU ── */}
          <ul className="navbar__menu" role="menubar">
            <li><NavLink to="/" end className={active}>Home</NavLink></li>

            <li>
              <NavLink to="/services" className={active}>Services <span className="chevron">▾</span></NavLink>
              <div className="dropdown dropdown--mega" role="menu">
                <div className="mega-col">
                  <div className="mega-heading">IT Services</div>
                  {[['💼','IT Consulting','Strategy & architecture','/services#consulting'],
                    ['⚙️','Software Engineering','Angular + .NET Core','/services#development'],
                    ['☁️','Cloud & DevOps','AWS, Azure, CI/CD','/services#cloud'],
                    ['🔒','Cybersecurity','Audits & compliance','/services#security'],
                  ].map(([i,l,d,to]) => (
                    <NavLink to={to} key={l}>
                      <span className="dd-icon">{i}</span>
                      <span><span className="dd-label">{l}</span><span className="dd-desc">{d}</span></span>
                    </NavLink>
                  ))}
                </div>
                <div className="mega-col">
                  <div className="mega-heading">Enterprise</div>
                  {[['🏢','ERP Solutions','Business management','/services#erp'],
                    ['🔗','API Integration','Connect your systems','/services#integration'],
                    ['🛡️','Managed Support','24/7 monitoring','/services#support'],
                    ['🎓','Training','Upskill your team','/services#training'],
                  ].map(([i,l,d,to]) => (
                    <NavLink to={to} key={l}>
                      <span className="dd-icon">{i}</span>
                      <span><span className="dd-label">{l}</span><span className="dd-desc">{d}</span></span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <NavLink to="/products" className={active}>Products <span className="chevron">▾</span></NavLink>
              <div className="dropdown" style={{ minWidth: 260 }} role="menu">
                <a href={INVOICE_URL} target="_blank" rel="noopener noreferrer">
                  <span className="dd-icon">🧾</span>
                  <span><span className="dd-label">Invoice Manager</span><span className="dd-desc">Live · Angular + .NET</span></span>
                </a>
                <a href={MUSIC_URL} target="_blank" rel="noopener noreferrer">
                  <span className="dd-icon">🎵</span>
                  <span><span className="dd-label">Music App</span><span className="dd-desc">Free · Beta</span></span>
                </a>
                <hr className="dd-divider" />
                {[['💍','Shadi Portal','/products#shadi'],['🚗','CX Ride','/products#ride'],
                  ['🏷️','CX Classifieds','/products#olex'],['🏠','CX Housing','/products#housing'],
                ].map(([i,l,to]) => (
                  <NavLink to={to} key={l}>
                    <span className="dd-icon">{i}</span>
                    <span><span className="dd-label">{l}</span><span className="dd-desc">Coming Soon</span></span>
                  </NavLink>
                ))}
              </div>
            </li>

            <li><NavLink to="/about"   className={active}>About</NavLink></li>
            <li><NavLink to="/blog"    className={active}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={active}>Contact</NavLink></li>
          </ul>

          {/* ── DESKTOP ACTIONS (hidden ≤991px) ── */}
          <div className="navbar__actions">
            <div className="theme-switcher" ref={themeRef}>
              <button className="theme-toggle" onClick={() => setThemeOpen(o => !o)}
                aria-label="Change colour theme" aria-expanded={themeOpen}>🎨</button>
              {themeOpen && (
                <div className="theme-panel" role="listbox">
                  <div className="theme-panel__title">Choose Theme</div>
                  {THEMES.map(t => (
                    <button key={t.key}
                      className={`theme-btn${theme === t.key ? ' active' : ''}`}
                      onClick={() => { setTheme(t.key); setThemeOpen(false) }}
                      role="option" aria-selected={theme === t.key}>
                      <span className={`swatch ${t.swatch}`} />{t.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer" className="nav-btn-ghost">Sign In</a>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="nav-btn-fill">Get Started</a>
          </div>

          {/* ── MOBILE RIGHT CLUSTER ──
              Sign In button is always visible on mobile (top-right, next to hamburger).
              This gives users instant access without opening the drawer.
          ── */}
          <div className="navbar__mobile-right">
            <a
              href={LOGIN_URL}
              target="_blank" rel="noopener noreferrer"
              className="mob-signin-btn"
              aria-label="Sign in to CodeXClear"
            >
              Sign In
            </a>
            <button
              className={`hamburger${mobileOpen ? ' open' : ''}`}
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              type="button"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div id="mobile-drawer"
        className={`mobile-drawer${mobileOpen ? ' open' : ''}`}
        aria-hidden={!mobileOpen}>

        <NavLink to="/" className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}>
          🏠 &nbsp;Home
        </NavLink>

        {[
          { key:'services', label:'Services', links:[
            ['/services#consulting','💼','IT Consulting'],
            ['/services#development','⚙️','Software Engineering'],
            ['/services#cloud','☁️','Cloud & DevOps'],
            ['/services#erp','🏢','ERP Solutions'],
            ['/services#security','🔒','Cybersecurity'],
          ]},
          { key:'products', label:'Products', links:[
            [INVOICE_URL,'🧾','Invoice Manager',true],
            [MUSIC_URL,'🎵','Music App',true],
            ['/products#shadi','💍','Shadi Portal'],
            ['/products#ride','🚗','CX Ride'],
            ['/products','📦','All Products'],
          ]},
        ].map(g => (
          <div className="mob-group" key={g.key}>
            <div className="mob-toggle"
              onClick={() => setMobSub(s => s === g.key ? null : g.key)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setMobSub(s => s === g.key ? null : g.key)}
              aria-expanded={mobSub === g.key}>
              {g.label} <span>{mobSub === g.key ? '▴' : '▾'}</span>
            </div>
            <div className={`mob-sub${mobSub === g.key ? ' open' : ''}`}>
              {g.links.map(([href, icon, label, ext]) =>
                ext
                  ? <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                       onClick={() => setMobileOpen(false)}>
                      <span>{icon}</span> {label}
                    </a>
                  : <NavLink key={label} to={href} onClick={() => setMobileOpen(false)}>
                      <span>{icon}</span> {label}
                    </NavLink>
              )}
            </div>
          </div>
        ))}

        {[['/about','👥','About'],['/blog','📝','Blog'],['/contact','✉️','Contact']].map(([to,ic,lb]) => (
          <NavLink key={to} to={to}
            className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}
            onClick={() => setMobileOpen(false)}>
            {ic} &nbsp;{lb}
          </NavLink>
        ))}

        <hr className="divider" style={{ margin: '0.75rem 0' }} />

        {/* Theme switcher in drawer */}
        <div className="mob-theme-label">Choose Theme</div>
        <div className="mob-theme-row">
          {THEMES.map(t => (
            <button key={t.key}
              className={`theme-btn${theme === t.key ? ' active' : ''}`}
              onClick={() => setTheme(t.key)} aria-pressed={theme === t.key}>
              <span className={`swatch ${t.swatch}`} />
              {t.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Auth CTAs in drawer */}
        <div className="mob-actions">
          <a href={LOGIN_URL} target="_blank" rel="noopener noreferrer"
            className="nav-btn-ghost" onClick={() => setMobileOpen(false)}>
            Sign In
          </a>
          <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer"
            className="nav-btn-fill" onClick={() => setMobileOpen(false)}>
            Register Free
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div aria-hidden="true" onClick={toggleMobile} className="drawer-backdrop" />
      )}
    </>
  )
}
