import React from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Privacy() {
  return (
    <div className="privacy-page">
      <section className="section">
        <div className="container">
          <div className="card">
            <div className="section-eyebrow">Privacy</div>
            <h1 style={{ marginBottom: '.5rem' }}>Privacy Policy</h1>
            <p style={{ color:'var(--text-secondary)', marginBottom:'1.25rem' }}>
              CodeXClear ("we", "us", "our") is committed to protecting your privacy. This policy
              explains how we collect, use, disclose, and safeguard your personal information when you
              use our website or contact us.
            </p>

            <h3>Information we collect</h3>
            <ul>
              <li>Contact details you provide (name, email, phone, message, service interest).</li>
              <li>Technical data such as IP address and browser user-agent when you submit forms.</li>
            </ul>

            <h3>How we use your information</h3>
            <ul>
              <li>To respond to your enquiries and provide requested services or information.</li>
              <li>To send transactional messages related to your enquiry (no marketing unless you opt-in).</li>
              <li>To improve and secure our website and services.</li>
            </ul>

            <h3>Sharing and third parties</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              We may share your information with trusted service providers (email delivery, analytics,
              CRM) who process data on our behalf. We do not sell your personal information.
            </p>

            <h3>Data retention</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              We retain contact enquiries for as long as necessary to respond and as required by law.
            </p>

            <h3>Your rights</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              You may request access, correction, or deletion of your personal data. Contact us at
              <a href="mailto:privacy@codexclear.com" style={{ color:'var(--accent-1)' }}> privacy@codexclear.com</a>.
            </p>

            <h3>Cookies</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              We use cookies and similar technologies for analytics and to improve the site experience.
            </p>

            <h3>Security</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              We implement reasonable security measures to protect your information, but no system
              is completely secure.
            </p>

            <h3>Changes</h3>
            <p style={{ color:'var(--text-secondary)' }}>
              We may update this policy. The "Last updated" date below indicates when this policy was last revised.
            </p>

            <div style={{ marginTop:'1rem', borderTop:'1px solid var(--border-mid)', paddingTop:'1rem' }}>
              <p style={{ fontSize:'.9rem', color:'var(--text-muted)' }}>Last updated: April 17, 2026</p>
              <p style={{ fontSize:'.9rem' }}>Questions? See our <Link to="/contact" style={{ color:'var(--accent-1)' }}>Contact page</Link> or email <a href="mailto:privacy@codexclear.com" style={{ color:'var(--accent-1)' }}>privacy@codexclear.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
