import React, { useState } from 'react';
import './FooterSubscribe.css';

function FooterSubscribe({ apiUrl = '/api/stayupdated/subscribe' }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const validate = () => {
    setError(null);
    const e = (email || '').trim();
    if (!e) return 'Email is required';
    if (e.includes(',')) return 'Email contains invalid characters';
    if (e.length > 33) return 'Email must not exceed 33 characters';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(e)) return 'Email format is invalid';
    if (name && name.length > 50) return 'Name must not exceed 50 characters';
    return null;
  };

  const handleSubmit = async (ev) => {
    ev?.preventDefault();
    const v = validate();
    if (v) { setError(v); setMessage(null); return; }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const payload = { Email: email.trim(), FirstName: name.trim() || null };
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      const serverMsg = data?.message || (res.ok ? 'Subscription received.' : 'Server error');

      // Show server message directly; backend returns "Already subscribed" for duplicates
      if (res.ok) {
        setMessage(serverMsg);
      } else {
        setError(serverMsg || 'Subscription failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const clientError = validate();

  return (
    <div className="footer-subscribe">
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="footer-email">Email</label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={33}
            aria-invalid={!!clientError}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="footer-name">Name (optional)</label>
          <input
            id="footer-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
        </div>

        <div className="actions">
          <button type="submit" disabled={!!clientError || submitting} aria-busy={submitting}>
            {submitting ? 'Submitting...' : 'Subscribe'}
          </button>
        </div>

        {clientError && <div className="msg error">{clientError}</div>}
        {error && <div className="msg error">{error}</div>}
        {message && <div className="msg success">{message}</div>}
      </form>
    </div>
  );
}

export default FooterSubscribe;
