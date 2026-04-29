import React from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import './Services.css'
import { useSEO, SEO_PAGES } from '../hooks/useSEO.js'

const SVCS = [
  { id:'consulting',   icon:'💼', title:'IT Consulting',       tags:['Strategy','Architecture','Roadmapping'],    desc:'Technology roadmapping, architecture design, and digital transformation advisory. We help you make the right decisions — from stack selection to cloud migration.' },
  { id:'development',  icon:'⚙️', title:'Software Engineering', tags:['Angular 17','.NET Core 8','REST APIs'],     desc:'Custom solutions on Angular and .NET Core — from admin panels to enterprise platforms. Clean, maintainable, well-tested code delivered on time.' },
  { id:'cloud',        icon:'☁️', title:'Cloud & DevOps',       tags:['AWS','Azure','Docker','CI/CD'],             desc:'Modern cloud on AWS and Azure. CI/CD pipelines, Docker & Kubernetes deployments, infrastructure as code with Terraform, and zero-downtime releases.' },
  { id:'erp',          icon:'🏢', title:'ERP Solutions',        tags:['HR & Payroll','Finance','Inventory'],       desc:'Comprehensive ERP implementations covering HR, finance, inventory, procurement, sales, and reporting. Custom-built, not off-the-shelf compromises.' },
  { id:'security',     icon:'🔒', title:'Cybersecurity',        tags:['Pen Testing','SOC2','GDPR'],                desc:'Security audits, penetration testing, compliance (SOC2, GDPR, ISO 27001), and ongoing threat monitoring. Protect your data and customers.' },
  { id:'integration',  icon:'🔗', title:'API Integration',      tags:['REST','GraphQL','Webhooks'],                desc:'Connect your business systems — CRM, ERP, payment gateways, logistics — with robust REST and GraphQL APIs. Break down silos.' },
  { id:'support',      icon:'🛡️', title:'Managed Support',      tags:['24/7','SLA','Incident Response'],           desc:'24/7 monitoring, proactive maintenance, incident response, and dedicated support tiers from Basic to Mission-Critical SLA.' },
  { id:'training',     icon:'🎓', title:'Training',             tags:['Angular','.NET Core','Cloud'],              desc:'Hands-on workshops tailored to your team. Angular, .NET Core, DevOps, cloud architecture — online and in-person across India.' },
  { id:'mobile',       icon:'📱', title:'Mobile & PWA',         tags:['PWA','Responsive','Offline'],               desc:'Progressive Web Apps and responsive designs. One codebase, native feel on Android, iOS, and desktop. Offline capable and installable.' },
]

const STEPS = [
  { n:'01', t:'Discover',          d:'Deep-dive into your requirements, goals, and existing systems. We listen before we build.' },
  { n:'02', t:'Design',            d:'Architecture, wireframes, and tech spec — signed off before a single line of code is written.' },
  { n:'03', t:'Build',             d:'Agile sprints with weekly demos, code reviews, automated testing, and continuous integration.' },
  { n:'04', t:'Launch & Support',  d:'Deploy to production, monitor performance, and stay by your side after go-live.' },
]

export default function Services() {
  usePageReveal()
  useSEO(SEO_PAGES.services)
  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div className="section-eyebrow reveal" style={{ display:'inline-block', marginBottom:'1rem' }}>What We Do</div>
          <h1 className="page-hero__title reveal delay-1">IT Services That <span className="grad-text">Drive Results</span></h1>
          <p className="page-hero__sub reveal delay-2">End-to-end technology solutions for businesses ready to grow.</p>
          <ul className="breadcrumb reveal delay-3">
            <li><Link to="/">Home</Link></li><li>·</li><li>Services</li>
          </ul>
        </div>
      </section>

      <section className="section" id="consulting">
        <div className="container">
          <div className="svc-grid">
            {SVCS.map((s, i) => (
              <div id={s.id} key={s.id} className="card reveal" style={{ transitionDelay:`${(i%3)*0.08}s` }}>
                <div className="card-icon">{s.icon}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
                <div className="tag-row" style={{ marginTop:'1rem' }}>
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop:'3rem' }}>
            <Link to="/contact" className="btn btn-grad btn-lg reveal">Get a Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:'3rem' }}>
            <div className="section-eyebrow">How We Work</div>
            <h2 className="section-title">Our <span className="grad-text">Delivery Process</span></h2>
          </div>
          <div className="process-grid">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`process-step reveal delay-${i+1}`}>
                <div className="process-num">{s.n}</div>
                <h5 className="process-title">{s.t}</h5>
                <p className="process-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Tech Stack</div>
            <h2 className="section-title">Built on <span className="grad-text">Industry-Leading</span> Tech</h2>
          </div>
          <div className="tech-cloud reveal delay-1">
            {['Angular 17','.NET Core 8','TypeScript','Azure','AWS','Docker','Kubernetes',
              'SQL Server','PostgreSQL','MongoDB','Redis','GitHub Actions','Terraform','Bootstrap 5','Material UI'].map(t => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
