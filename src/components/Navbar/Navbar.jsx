import React, { useState, useEffect, useRef, useCallback } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext.jsx'
import logoIcon from '../../assets/logo.png'
import './Navbar.css'

const LOGIN_URL    = import.meta.env.VITE_LOGIN_URL    || 'https://login.codexclear.com/login'
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL || 'https://login.codexclear.com/register'
const INVOICE_URL  = import.meta.env.VITE_INVOICE_APP_URL || 'https://login.codexclear.com/login?app=invoice'
const MUSIC_URL    = import.meta.env.VITE_MUSIC_APP_URL   || 'https://login.codexclear.com/login?app=music'

const THEMES = [
  { key: 'default', label: 'Deep Navy',     swatch: 'swatch--navy'   },
  { key: 'aurora',  label: 'Purple Aurora', swatch: 'swatch--aurora' },
  { key: 'arctic',  label: 'Arctic Light',  swatch: 'swatch--arctic' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [mobSub,      setMobSub]      = useState(null)
  const [themeOpen,   setThemeOpen]   = useState(false)
  const themeRef = useRef(null)

  /* scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close on route change */
  useEffect(() => {
    setMobileOpen(false); setMobSub(null)
    document.body.style.overflow = ''
  }, [location])

  /* close theme panel on outside click */
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

  const activeClass = ({ isActive }) => (isActive ? 'active' : undefined)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="navbar__inner">

          {/* Brand */}
          <Link to="/" className="navbar__brand" aria-label="CodeXClear home">
            <img src={logoIcon} alt="CodeXClear logo" className="navbar__logo" />
            <span className="navbar__name">Code<span className="x">X</span>Clear</span>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar__menu" role="menubar">
            <li><NavLink to="/" end className={activeClass}>Home</NavLink></li>

            <li>
              <NavLink to="/services" className={activeClass}>
                Services <span className="chevron">▾</span>
              </NavLink>
              <div className="dropdown dropdown--mega" role="menu">
                <div className="mega-col">
                  <div className="mega-heading">IT Services</div>
                  {[['💼','IT Consulting','Strategy & architecture','/services#consulting'],
                    ['⚙️','Software Engineering','Angular + .NET Core','/services#development'],
                    ['☁️','Cloud & DevOps','AWS, Azure, CI/CD','/services#cloud'],
                    ['🔒','Cybersecurity','Audits & compliance','/services#security'],
                  ].map(([icon,label,desc,to]) => (
                    <NavLink to={to} key={label}>
                      <span className="dd-icon">{icon}</span>
                      <span><span className="dd-label">{label}</span><span className="dd-desc">{desc}</span></span>
                    </NavLink>
                  ))}
                </div>
                <div className="mega-col">
                  <div className="mega-heading">Enterprise</div>
                  {[['🏢','ERP Solutions','Business management','/services#erp'],
                    ['🔗','API Integration','Connect your systems','/services#integration'],
                    ['🛡️','Managed Support','24/7 monitoring','/services#support'],
                    ['🎓','Training','Upskill your team','/services#training'],
                  ].map(([icon,label,desc,to]) => (
                    <NavLink to={to} key={label}>
                      <span className="dd-icon">{icon}</span>
                      <span><span className="dd-label">{label}</span><span className="dd-desc">{desc}</span></span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <NavLink to="/products" className={activeClass}>
                Products <span className="chevron">▾</span>
              </NavLink>
              <div className="dropdown" style={{ minWidth: 260 }} role="menu">
                <a href={INVOICE_URL}>
                  <span className="dd-icon">🧾</span>
                  <span><span className="dd-label">Invoice Manager</span><span className="dd-desc">Live · Angular + .NET</span></span>
                </a>
                <a href={MUSIC_URL}>
                  <span className="dd-icon">🎵</span>
                  <span><span className="dd-label">Music App</span><span className="dd-desc">Free · Beta</span></span>
                </a>
                <hr className="dd-divider" />
                {[['💍','Shadi Portal','/products#shadi'],['🚗','CX Ride','/products#ride'],
                  ['🏷️','CX Classifieds','/products#olex'],['🏠','CX Housing','/products#housing']
                ].map(([icon,label,to]) => (
                  <NavLink to={to} key={label}>
                    <span className="dd-icon">{icon}</span>
                    <span><span className="dd-label">{label}</span><span className="dd-desc">Coming Soon</span></span>
                  </NavLink>
                ))}
              </div>
            </li>

            <li><NavLink to="/about"   className={activeClass}>About</NavLink></li>
            <li><NavLink to="/blog"    className={activeClass}>Blog</NavLink></li>
            <li><NavLink to="/contact" className={activeClass}>Contact</NavLink></li>
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            {/* Theme switcher */}
            <div className="theme-switcher" ref={themeRef}>
              <button
                className="theme-toggle"
                onClick={() => setThemeOpen(o => !o)}
                aria-label="Change theme"
                aria-expanded={themeOpen}
              >🎨</button>
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

            <a href={LOGIN_URL} className="nav-btn-ghost">Sign In</a>
            <a href={REGISTER_URL} className="nav-btn-fill">Get Started</a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <NavLink to="/" className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}>Home</NavLink>

        {[
          { key: 'services', label: 'Services', links: [
            ['/services#consulting','💼','IT Consulting'],
            ['/services#development','⚙️','Software Engineering'],
            ['/services#cloud','☁️','Cloud & DevOps'],
            ['/services#erp','🏢','ERP Solutions'],
          ]},
          { key: 'products', label: 'Products', links: [
            [INVOICE_URL,'🧾','Invoice Manager',true],
            [MUSIC_URL,'🎵','Music App',true],
            ['/products#shadi','💍','Shadi Portal'],
            ['/products#ride','🚗','CX Ride'],
            ['/products','📦','All Products'],
          ]},
        ].map(group => (
          <div className="mob-group" key={group.key}>
            <div className="mob-toggle" onClick={() => setMobSub(s => s === group.key ? null : group.key)}>
              {group.label} <span>{mobSub === group.key ? '▴' : '▾'}</span>
            </div>
            <div className={`mob-sub${mobSub === group.key ? ' open' : ''}`}>
              {group.links.map(([href, icon, label, external]) =>
                external
                  ? <a key={label} href={href}><span>{icon}</span> {label}</a>
                  : <NavLink key={label} to={href}><span>{icon}</span> {label}</NavLink>
              )}
            </div>
          </div>
        ))}

        {[['/about','About'],['/blog','Blog'],['/contact','Contact']].map(([to,label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `mob-link${isActive ? ' active' : ''}`}>{label}</NavLink>
        ))}

        <hr className="divider" style={{ margin: '1rem 0' }} />

        <div className="mob-theme-row">
          {THEMES.map(t => (
            <button key={t.key} className={`theme-btn${theme === t.key ? ' active' : ''}`} onClick={() => setTheme(t.key)}>
              <span className={`swatch ${t.swatch}`} />{t.label.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="mob-actions">
          <a href={LOGIN_URL} className="nav-btn-ghost">Sign In</a>
          <a href={REGISTER_URL} className="nav-btn-fill">Register</a>
        </div>
      </div>
    </>
  )
}
