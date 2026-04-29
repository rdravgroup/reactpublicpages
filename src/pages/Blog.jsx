import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageReveal } from '../hooks/useScrollReveal.js'
import './Blog.css'
import { useSEO, SEO_PAGES } from '../hooks/useSEO.js'

const CATS = ['all','engineering','product','devops','company']

const POSTS = [
  { id:1, cat:'engineering', icon:'🔐', bg:'linear-gradient(135deg,#0e1b2a,#0b2aaa)', title:'Theme Systems in Angular: localStorage + CSS Variables Done Right',       excerpt:'Persistent multi-theme support without heavy libraries — just CSS custom properties and 20 lines of JS.', author:'Dinesh Kumar', init:'DK', date:'Mar 25 2025', read:'6 min' },
  { id:2, cat:'product',     icon:'🎵', bg:'linear-gradient(135deg,#8a2be2,#ff6b6b)', title:'Introducing Music App — Free Streaming for Everyone',                      excerpt:'Why we built a free music PWA and how it shares authentication with our Invoice Manager using one .NET Core identity service.', author:'Aishwarya Singh', init:'AS', date:'Mar 15 2025', read:'5 min' },
  { id:3, cat:'devops',      icon:'☁️', bg:'linear-gradient(135deg,#00aeef,#00d4a8)', title:'Zero-Downtime Deployments on Azure with GitHub Actions',                    excerpt:'Blue-green deployment, health check gates, and instant rollback — the exact CI/CD pipeline we use in production.', author:'Rahul Verma', init:'RV', date:'Mar 5 2025',  read:'8 min' },
  { id:4, cat:'product',     icon:'💍', bg:'linear-gradient(135deg,#e91e8c,#ff6b9d)', title:"Announcing CX Shadi Portal — India's Next Matrimonial Platform",            excerpt:'Our vision for a modern, privacy-first matrimonial portal with AI matchmaking — built in Lucknow for India.', author:'Priya Sharma', init:'PS', date:'Feb 22 2025', read:'4 min' },
  { id:5, cat:'devops',      icon:'🛡️', bg:'linear-gradient(135deg,#0b2aaa,#8a2be2)', title:'SOC2 Compliance at Startup Speed: What We Learned',                        excerpt:'Tools, processes, and mindset shifts for achieving SOC2 Type I without a dedicated security team.', author:'Dinesh Kumar', init:'DK', date:'Feb 10 2025', read:'9 min' },
  { id:6, cat:'company',     icon:'🏆', bg:'linear-gradient(135deg,#f5a623,#e94560)', title:"Building India's Next Tech Product Company from Lucknow",                   excerpt:"Our founder's story — why Lucknow, how we grew to serve clients in India, UK, and the US, and what's next.", author:'Sanju Sharma', init:'SS', date:'Jan 28 2025', read:'4 min' },
]

export default function Blog() {
  usePageReveal()
  useSEO(SEO_PAGES.blog)
  const [cat, setCat]       = useState('all')
  const [email, setEmail]   = useState('')
  const [subOk, setSubOk]   = useState(false)
  const [subErr, setSubErr] = useState('')
  const filtered = cat === 'all' ? POSTS : POSTS.filter(p => p.cat === cat)

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setSubErr('Enter a valid email.'); return }
    setSubOk(true); setEmail(''); setSubErr('')
    setTimeout(() => setSubOk(false), 4000)
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <div className="section-eyebrow reveal" style={{ display:'inline-block', marginBottom:'1rem' }}>Insights &amp; Updates</div>
          <h1 className="page-hero__title reveal delay-1">CodeXClear <span className="grad-text">Blog</span></h1>
          <p className="page-hero__sub reveal delay-2">Engineering deep dives, product updates, and company news from Lucknow.</p>
          <ul className="breadcrumb reveal delay-3"><li><Link to="/">Home</Link></li><li>·</li><li>Blog</li></ul>
        </div>
      </section>

      {/* Filters */}
      <div style={{ background:'var(--bg-base)', padding:'32px 0 0' }}>
        <div className="container">
          <div className="filter-bar reveal">
            {CATS.map(c => (
              <button key={c} className={`filter-btn${cat===c?' active':''}`} onClick={() => setCat(c)}>
                {c === 'all' ? 'All Posts' : c.charAt(0).toUpperCase()+c.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      <section style={{ padding:'40px 0 0' }}>
        <div className="container">
          <div className="featured reveal">
            <div className="featured__thumb" style={{ background:'linear-gradient(135deg,#0b2aaa,#00aeef)' }}>👨‍💻</div>
            <div className="featured__body">
              <span className="section-eyebrow" style={{ marginBottom:'.75rem', display:'inline-block' }}>⭐ Featured · Engineering</span>
              <h2 className="featured__title">Building Invoice App: Angular 17 + .NET Core 8 Architecture Deep Dive</h2>
              <p className="featured__excerpt">JWT auth, shared component libraries, PDF generation, and role-based admin panels — everything we learned building the Invoice Manager from scratch.</p>
              <div className="post-author">
                <div className="post-avatar">DK</div>
                <div><div className="post-name">Dinesh Kumar</div><div className="post-meta">Apr 1, 2025 · 12 min read</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section" style={{ paddingTop:'40px' }}>
        <div className="container">
          {filtered.length === 0
            ? <p className="text-center" style={{ color:'var(--text-muted)', padding:'3rem' }}>No posts in this category yet.</p>
            : (
              <div className="blog-grid">
                {filtered.map((p, i) => (
                  <div key={p.id} className={`blog-card reveal delay-${(i%3)+1}`}>
                    <div className="blog-thumb" style={{ background: p.bg }}>
                      <span>{p.icon}</span>
                      <span className="blog-cat">{p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</span>
                    </div>
                    <div className="blog-body">
                      <div className="post-meta">{p.date} · {p.read} read</div>
                      <h4 className="blog-title">{p.title}</h4>
                      <p className="blog-excerpt">{p.excerpt}</p>
                      <div className="post-author">
                        <div className="post-avatar" style={{ width:32, height:32, fontSize:'.75rem' }}>{p.init}</div>
                        <div className="post-name" style={{ fontSize:'.82rem' }}>{p.author}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      </section>

      {/* Newsletter */}
      <section className="section section-alt">
        <div className="container" style={{ display:'flex', justifyContent:'center' }}>
          <div className="nl-card reveal">
            <div style={{ fontSize:'2rem', marginBottom:'.75rem', textAlign:'center' }}>✉️</div>
            <h3 style={{ fontSize:'1.4rem', fontWeight:800, marginBottom:'.5rem', textAlign:'center', color:'var(--text-primary)' }}>Never Miss a Post</h3>
            <p style={{ fontSize:'.875rem', color:'var(--text-secondary)', marginBottom:'1.5rem', textAlign:'center' }}>Weekly digest — no spam, unsubscribe anytime.</p>
            {subOk
              ? <p style={{ textAlign:'center', color:'#4caf50', fontWeight:600 }}>✓ You're subscribed!</p>
              : (
                <form className="newsletter-row" onSubmit={subscribe} noValidate style={{ maxWidth:'100%' }}>
                  <input type="email" className="newsletter-input" placeholder="your@email.com" value={email}
                    onChange={e => { setEmail(e.target.value); setSubErr('') }} aria-label="Newsletter email" />
                  <button type="submit" className="btn btn-grad btn-sm" style={{ whiteSpace:'nowrap' }}>Subscribe</button>
                </form>
              )
            }
            {subErr && <p style={{ color:'#f44336', fontSize:'.8rem', marginTop:'.5rem', textAlign:'center' }}>{subErr}</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
