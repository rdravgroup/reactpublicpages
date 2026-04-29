import React from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import { useCounter } from '../hooks/useCounter.js'
import './About.css'
import { useSEO, SEO_PAGES } from '../hooks/useSEO.js'

const VALUES = [
  { icon:'🎯', t:'Clarity First',   d:'We explain everything in plain language. No jargon, no surprises — just clear outcomes at every step.' },
  { icon:'⚡', t:'Speed & Quality', d:'Fast delivery without cutting corners. Modern tooling and proven patterns to ship robust software quickly.' },
  { icon:'👥', t:'Client Obsessed', d:'Your success is our success. We stay engaged long after launch to ensure results and iterate with you.' },
  { icon:'💡', t:'Innovation',      d:'We stay ahead of the curve so your products are built on the latest, most reliable technology.' },
]

const TIMELINE = [
  { year:'2019', t:'CodeXClear Founded',           d:'Started as a software consultancy in Lucknow focused on Angular and .NET Core.' },
  { year:'2021', t:'First Enterprise Client',       d:'Landed first enterprise client. Team expanded to 15 engineers.' },
  { year:'2022', t:'Invoice Manager Launched',      d:'Launched as a standalone SaaS product — now used by 100+ businesses.' },
  { year:'2023', t:'Cloud Practice Launched',       d:'Established dedicated AWS and Azure practice. Achieved SOC2 Type I compliance.' },
  { year:'2024', t:'Music App Beta',                d:'Launched the free Music App in beta. Expanded product portfolio.' },
  { year:'2025', t:'CodeXClear.com Platform',       d:'Unified platform with SSO across all applications and this public website.' },
]

function Stat({ target, suffix, label }) {
  const ref = useCounter(target, suffix)
  return <div className="stat-card reveal"><div className="stat-num" ref={ref}>0{suffix}</div><div className="stat-lbl">{label}</div></div>
}

export default function About() {
  usePageReveal()
  useSEO(SEO_PAGES.about)
  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div className="section-eyebrow reveal" style={{ display:'inline-block', marginBottom:'1rem' }}>Our Story</div>
          <h1 className="page-hero__title reveal delay-1">About <span className="grad-text">CodeXClear</span></h1>
          <p className="page-hero__sub reveal delay-2">Modern IT services built for businesses that value clarity, speed, and precision.</p>
          <ul className="breadcrumb reveal delay-3"><li><Link to="/">Home</Link></li><li>·</li><li>About</li></ul>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="about-split">
            <div className="reveal-left">
              <div className="section-eyebrow">Our Mission</div>
              <h2 className="section-title">Technology, <span className="grad-text">Made Clear</span></h2>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.9, marginBottom:'1.5rem' }}>
                CodeXClear was founded on the belief that great technology should be accessible, understandable, and practical. We combine deep engineering expertise with clear communication — so you always know exactly what we're building and why.
              </p>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.9, marginBottom:'2rem' }}>
                Specialising in Angular and .NET Core, we deliver everything from single-page invoicing apps to enterprise-grade ERP platforms for clients across India, the UK, and the US.
              </p>
              <Link to="/contact" className="btn btn-grad">Work With Us</Link>
            </div>
            <div className="reveal-right delay-2">
              <div className="stats-2x2">
                <Stat target={200} suffix="+" label="Projects Delivered" />
                <Stat target={8}   suffix="yr" label="Years Experience"   />
                <Stat target={50}  suffix="+" label="Enterprise Clients"  />
                <Stat target={99}  suffix="%" label="Satisfaction Rate"   />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:'3rem' }}>
            <div className="section-eyebrow">Our Values</div>
            <h2 className="section-title">Principles That <span className="grad-text">Guide Us</span></h2>
          </div>
          <div className="grid-4">
            {VALUES.map((v, i) => (
              <div key={v.t} className={`card text-center reveal delay-${i+1}`}>
                <div className="card-icon" style={{ margin:'0 auto 1.25rem' }}>{v.icon}</div>
                <h4 className="card-title">{v.t}</h4>
                <p className="card-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="timeline-split">
            <div className="reveal-left">
              <div className="section-eyebrow">Our Journey</div>
              <h2 className="section-title">From Startup to <span className="grad-text">Global</span></h2>
              <p style={{ color:'var(--text-secondary)', lineHeight:1.9, marginBottom:'1.5rem' }}>
                Six years of building, launching, and growing — from a small team in Lucknow to serving clients worldwide.
              </p>
              <div className="award-list">
                {['🏆 Best IT Firm — Lucknow 2023','🌟 ISO 9001 Certified','🚀 SOC2 Type I Compliant'].map(a => (
                  <div key={a} className="award-badge">{a}</div>
                ))}
              </div>
            </div>
            <div className="timeline reveal-right delay-1">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`tl-item reveal delay-${i+1}`}>
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-title">{item.t}</div>
                  <div className="tl-desc">{item.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt text-center">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Join Us</div>
            <h2 className="section-title">Want to <span className="grad-text">Work Together?</span></h2>
            <p className="section-sub mx-auto" style={{ marginBottom:'2rem' }}>Whether you need a technology partner or want to join our team in Lucknow — we'd love to hear from you.</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/contact" className="btn btn-grad btn-lg">Get In Touch</Link>
              <Link to="/services" className="btn btn-outline btn-lg">Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
