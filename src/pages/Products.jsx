import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import './Products.css'

const INVOICE_URL  = import.meta.env.VITE_INVOICE_APP_URL || 'https://login.codexclear.com/login?app=invoice'
const MUSIC_URL    = import.meta.env.VITE_MUSIC_APP_URL   || 'https://login.codexclear.com/login?app=music'
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL    || 'https://login.codexclear.com/register'

const LIVE = [
  { icon:'🧾', cls:'invoice', name:'Invoice Manager', badge:'Live Now', bcls:'status-badge--live', href:INVOICE_URL, tags:['Angular 17','.NET Core 8','Admin Panel','PDF Export','Reports'], desc:'Full-featured invoicing and billing system. Create customers, products, invoices, and purchase orders — with a polished admin panel and .NET Core API.', cta:'Sign In to Invoice App', cta2:'Create Account', cta2href:REGISTER_URL },
  { icon:'🎵', cls:'music',   name:'Music App',       badge:'Beta — Free', bcls:'status-badge--beta', href:MUSIC_URL, tags:['Free Forever','Streaming','Playlists','PWA','Offline'], desc:'Free-to-use music streaming platform. Discover and stream music, build playlists, and enjoy an ad-free experience.', cta:'Join the Beta', cta2:'Create Free Account', cta2href:REGISTER_URL },
]

const COMING = [
  { id:'shadi',   icon:'💍', cls:'shadi',   name:'Shadi Portal',   tags:['Matrimonial','Verified','AI Match'],    desc:'Modern matrimonial portal — verified profiles, smart AI matchmaking, family connect, and privacy controls. Built for India.' },
  { id:'ride',    icon:'🚗', cls:'ride',    name:'CX Ride',         tags:['Ride Hailing','Real-time','Driver App'], desc:'On-demand ride booking like Rapido & Ola. Real-time GPS, fare calculator, and driver portal.' },
  { id:'olex',    icon:'🏷️', cls:'olex',    name:'CX Classifieds',  tags:['Classifieds','Buy & Sell','Free Ads'],  desc:'Buy & sell classifieds — like OLX. Post ads for vehicles, electronics, property, and services. Free.' },
  { id:'housing', icon:'🏠', cls:'housing', name:'CX Housing',      tags:['Real Estate','Listings','Virtual Tour'],'desc':'Property portal. Buy, sell, and rent homes and commercial spaces. Virtual tours and EMI calculator.' },
  { id:'store',   icon:'🛒', cls:'store',   name:'CX Store',        tags:['E-Commerce','Multi-vendor','Payments'], desc:'E-commerce management with catalog, inventory, orders, multi-payment gateways, and multi-vendor support.' },
  { id:'erp',     icon:'🏭', cls:'erp',     name:'ERP Platform',    tags:['Enterprise','HR','Finance','Analytics'], desc:'Full ERP: HR, payroll, finance, procurement, inventory, and BI dashboards for mid-market enterprises.' },
]

export default function Products() {
  usePageReveal()
  const [notified, setNotified] = useState({})
  const notify = (id) => { setNotified(p => ({ ...p, [id]: true })); setTimeout(() => setNotified(p => ({ ...p, [id]: false })), 3000) }

  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div className="section-eyebrow reveal" style={{ display:'inline-block', marginBottom:'1rem' }}>Our Apps</div>
          <h1 className="page-hero__title reveal delay-1">Products Built to <span className="grad-text">Solve Real Problems</span></h1>
          <p className="page-hero__sub reveal delay-2">One CodeXClear account. Multiple powerful applications. Shared auth across all platforms.</p>
          <ul className="breadcrumb reveal delay-3"><li><Link to="/">Home</Link></li><li>·</li><li>Products</li></ul>
        </div>
      </section>

      {/* Live */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:'3rem' }}>
            <div className="section-eyebrow">Available Now</div>
            <h2 className="section-title">Live <span className="grad-text">&amp; Beta</span> Products</h2>
          </div>
          <div className="live-grid">
            {LIVE.map((p, i) => (
              <div key={p.name} className={`app-card reveal delay-${i}`}>
                <div className="app-card__header">
                  <div className={`app-card__icon icon-${p.cls}`}>{p.icon}</div>
                  <div>
                    <div className="app-card__name" style={{ fontSize:'1.2rem' }}>{p.name}</div>
                    <span className={`status-badge ${p.bcls}`}><span className="status-dot" />{p.badge}</span>
                  </div>
                </div>
                <div className="app-card__body">
                  <p className="app-card__desc">{p.desc}</p>
                  <div className="tag-row">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
                  <div className="prod-ctas">
                      <a href={p.href} className="btn btn-grad" style={{ flex:1, justifyContent:'center' }}>{p.cta}</a>
                      <a href={p.cta2href} className="btn btn-outline" style={{ flex:1, justifyContent:'center' }}>{p.cta2}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:'3rem' }}>
            <div className="section-eyebrow">In Development</div>
            <h2 className="section-title">Coming <span className="grad-text">2025–26</span></h2>
            <p className="section-sub mx-auto">Register interest and be first in line. All apps share your CodeXClear account.</p>
          </div>
          <div className="coming-grid">
            {COMING.map((p, i) => (
              <div id={p.id} key={p.id} className={`app-card reveal delay-${(i%3)+1}`} style={{ opacity:.85 }}>
                <div className="app-card__header">
                  <div className={`app-card__icon icon-${p.cls}`}>{p.icon}</div>
                  <div>
                    <div className="app-card__name">{p.name}</div>
                    <span className="status-badge status-badge--soon"><span className="status-dot" />Coming Soon</span>
                  </div>
                </div>
                <div className="app-card__body">
                  <p className="app-card__desc" style={{ fontSize:'.875rem' }}>{p.desc}</p>
                  <div className="tag-row">{p.tags.map(t=><span key={t} className="tag">{t}</span>)}</div>
                  <button className="btn btn-outline btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={() => notify(p.id)}>
                    {notified[p.id] ? '✓ Registered!' : 'Register Interest'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSO banner */}
      <section className="section text-center">
        <div className="container">
          <div className="sso-card reveal" style={{ maxWidth:700, margin:'0 auto' }}>
            <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🔑</div>
            <h3 style={{ fontSize:'1.4rem', fontWeight:800, marginBottom:'.75rem', color:'var(--text-primary)' }}>One Login. All Apps.</h3>
            <p style={{ fontSize:'.9rem', color:'var(--text-secondary)', marginBottom:'1.75rem', lineHeight:1.8 }}>
              Create a single CodeXClear account to access Invoice Manager, Music App, Shadi Portal, CX Ride, CX Classifieds, CX Housing and every future product.
            </p>
            <a href={REGISTER_URL} className="btn btn-grad btn-lg">Create Free Account</a>
          </div>
        </div>
      </section>
    </div>
  )
}
