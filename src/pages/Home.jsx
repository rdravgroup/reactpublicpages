import React from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import { useCounter } from '../hooks/useCounter.js'
import './Home.css'

const INVOICE_URL  = import.meta.env.VITE_INVOICE_APP_URL || 'https://login.codexclear.com/login?app=invoice'
const MUSIC_URL    = import.meta.env.VITE_MUSIC_APP_URL   || 'https://login.codexclear.com/login?app=music'
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL    || 'https://login.codexclear.com/register'

const SERVICES = [
  { icon:'💼', title:'IT Consulting',      desc:'Strategic technology roadmapping, architecture design, and digital transformation advisory.' },
  { icon:'⚙️', title:'Software Engineering', desc:'Custom Angular + .NET Core solutions — from admin panels to full-scale enterprise platforms.' },
  { icon:'☁️', title:'Cloud & DevOps',     desc:'Modern cloud on AWS and Azure. CI/CD pipelines, Docker, Kubernetes and infrastructure as code.' },
  { icon:'🏢', title:'ERP Solutions',      desc:'Comprehensive ERP covering HR, finance, inventory, procurement, and reporting.' },
  { icon:'🔒', title:'Cybersecurity',      desc:'Security audits, pen testing, SOC2, GDPR, ISO 27001, and ongoing threat monitoring.' },
  { icon:'📱', title:'Mobile & PWA',       desc:'Progressive Web Apps that feel native on Android, iOS, and desktop — offline capable.' },
]

const TESTIMONIALS = [
  { initials:'RM', name:'Rahul Mehta',   role:'CFO, NovaSoft Ltd',   stars:5, text:'The Invoice Manager transformed our billing. What took hours now takes minutes. The Angular UI is exceptionally polished.' },
  { initials:'SK', name:'Sneha Kapoor', role:'CTO, AetherERP',      stars:5, text:'CodeXClear rebuilt our infrastructure on Azure. Zero downtime migration and our platform now handles 10× the traffic.' },
  { initials:'AK', name:'Anand Kumar',  role:'Director, PrismHR',   stars:5, text:'Their ERP consulting team understood our requirements immediately. Delivery was ahead of schedule and under budget.' },
]

function Stat({ target, suffix, label }) {
  const ref = useCounter(target, suffix)
  return (
    <div className="stat-card reveal">
      <div className="stat-num" ref={ref}>0{suffix}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  )
}

export default function Home() {
  usePageReveal()

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid-lines" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero__layout">
            <div className="hero__content">
              <div className="hero__eyebrow reveal">
                <span className="hero__dot" />
                IT &amp; Technology Services
              </div>
              <h1 className="hero__h1 reveal delay-1">
                Code <span className="grad-text">Smarter.</span><br />
                Build <span className="grad-text">Faster.</span><br />
                Scale <span className="grad-text">Clearer.</span>
              </h1>
              <p className="hero__sub reveal delay-2">
                CodeXClear delivers end-to-end technology solutions — from custom software and ERP
                to cloud, security, and ready-to-use applications built on Angular + .NET Core.
              </p>
              <div className="hero__cta reveal delay-3">
                <Link to="/services" className="btn btn-grad btn-lg">Explore Services</Link>
                <Link to="/contact" className="btn btn-outline btn-lg">Free Consultation</Link>
              </div>
              <div className="hero__metrics reveal delay-4">
                {[['200+','Projects'],['50+','Clients'],['99%','Satisfaction']].map(([val,lbl]) => (
                  <div key={lbl}>
                    <div className="hero__metric-num">{val}</div>
                    <div className="hero__metric-lbl">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero__visual reveal-right delay-2">
              <div className="hero__card float-1">
                <div className="hero__apps">
                  <a href={INVOICE_URL} className="hero__app-tile">
                    <div className="hero__app-icon">🧾</div>
                    <div className="hero__app-name">Invoice App</div>
                    <div className="hero__app-sub">Live · Angular + .NET</div>
                  </a>
                  <a href={MUSIC_URL} className="hero__app-tile">
                    <div className="hero__app-icon">🎵</div>
                    <div className="hero__app-name">Music App</div>
                    <div className="hero__app-sub">Free · Beta</div>
                  </a>
                </div>
                <div className="code-snippet">
                  <div className="code-dots">
                    <span style={{ background: '#ff5f57' }} /><span style={{ background: '#febc2e' }} /><span style={{ background: '#28c840' }} />
                  </div>
                  <div><span className="kw">const</span> c = <span className="kw">new</span> <span className="fn">CodeXClear</span>()</div>
                  <div>c.<span className="fn">build</span>({'{'} stack: <span className="str">"Angular+.NET"</span> {'}'})</div>
                  <div>c.<span className="fn">deploy</span>(<span className="str">"production"</span>) <span className="cm">// 🚀</span></div>
                </div>
                <div className="hero__badge hero__badge--top float-2">
                  <span style={{ color: '#4caf50' }}>●</span> System Online
                </div>
                <div className="hero__badge hero__badge--bottom float-1">
                  🔒 SOC2 Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="trusted">
        <div className="container">
          <p className="trusted__label reveal">Trusted by businesses across industries</p>
          <div className="trusted__logos reveal delay-1">
            {['VertexTech','NovaSoft','AetherERP','PrismHR','ZenithCloud','SolaraData'].map(n => (
              <span key={n} className="trusted__logo">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-eyebrow">What We Do</div>
            <h2 className="section-title">Technology That <span className="grad-text">Drives Results</span></h2>
            <p className="section-sub mx-auto">End-to-end IT services for businesses ready to grow with modern, reliable technology.</p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div key={s.title} className="card reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div className="card-icon">{s.icon}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-grad reveal">View All Services</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-sm stats-band">
        <div className="container">
          <div className="grid-4">
            <Stat target={200} suffix="+" label="Projects Delivered" />
            <Stat target={50}  suffix="+" label="Enterprise Clients"  />
            <Stat target={8}   suffix="yr" label="Years Experience"   />
            <Stat target={99}  suffix="%" label="Client Satisfaction" />
          </div>
        </div>
      </section>

      {/* ── PRODUCTS TEASER ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-eyebrow">Our Apps</div>
            <h2 className="section-title">Powerful <span className="grad-text">Products</span></h2>
            <p className="section-sub mx-auto">One login. Multiple powerful applications. All built on Angular + .NET Core.</p>
          </div>
          <div className="grid-4">
            {[
              { icon:'🧾', cls:'invoice', name:'Invoice Manager', badge:'Live', bcls:'status-badge--live', link:INVOICE_URL, ext:true,  desc:'Full billing system with admin panel.' },
              { icon:'🎵', cls:'music',   name:'Music App',       badge:'Beta', bcls:'status-badge--beta', link:MUSIC_URL,   ext:true,  desc:'Free music streaming — no ads.' },
              { icon:'💍', cls:'shadi',   name:'Shadi Portal',    badge:'Soon', bcls:'status-badge--soon', link:'/products', ext:false, desc:'Matrimonial portal for India.' },
              { icon:'🚗', cls:'ride',    name:'CX Ride',         badge:'Soon', bcls:'status-badge--soon', link:'/products', ext:false, desc:'On-demand ride booking app.' },
            ].map(p => (
              <div key={p.name} className="app-card reveal">
                <div className="app-card__header">
                  <div className={`app-card__icon icon-${p.cls}`}>{p.icon}</div>
                  <div>
                    <div className="app-card__name">{p.name}</div>
                    <span className={`status-badge ${p.bcls}`}><span className="status-dot" />{p.badge}</span>
                  </div>
                </div>
                <div className="app-card__body">
                  <p className="app-card__desc">{p.desc}</p>
                  {p.ext
                    ? <a href={p.link} className="btn btn-grad btn-sm" style={{ width:'100%', justifyContent:'center' }}>Open App</a>
                    : <Link to={p.link} className="btn btn-outline btn-sm" style={{ width:'100%', justifyContent:'center' }}>Learn More</Link>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/products" className="btn btn-outline reveal">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-eyebrow">Testimonials</div>
            <h2 className="section-title">What Our <span className="grad-text">Clients Say</span></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`testimonial reveal delay-${i + 1}`}>
                <div className="testimonial__stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial__text">{t.text}</p>
                <div className="testimonial__author">
                  <div className="testimonial__avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial__name">{t.name}</div>
                    <div className="testimonial__role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-alt text-center">
        <div className="container">
          <div className="reveal">
            <div className="section-eyebrow">Let's Build</div>
            <h2 className="section-title">Ready to Transform <span className="grad-text">Your Business?</span></h2>
            <p className="section-sub mx-auto" style={{ marginBottom: '2rem' }}>
              From quick consultation to full-scale digital transformation — we're ready to help.
            </p>
            <div className="cta-row">
              <Link to="/contact" className="btn btn-grad btn-lg">Start a Conversation</Link>
              <Link to="/products" className="btn btn-outline btn-lg">Explore Products</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
