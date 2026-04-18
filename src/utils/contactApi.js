// Use relative `/api` in development (so Vite dev proxy forwards requests to local backend).
// In production use VITE_API_BASE_URL (or fallback to the production API).
const BASE = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL ?? 'https://rnstore.runasp.net')

/**
 * POST contact form data to .NET Core API.
 * Expects:  POST /api/contactus/create  { FullName, Email, CountryCode, PhoneNumber, ServiceId, Message }
 * Returns:  { success, message }
 */
export async function sendContactForm(data) {
  // Use explicit countryCode and phone provided by the form. Backend expects:
  // { FullName, Email, CountryCode, PhoneNumber, ServiceId, Message }
  const phoneNumber = String(data.phone || '').replace(/\D/g, '')
  const payload = {
    FullName:    data.name?.trim(),
    Email:       data.email?.trim().toLowerCase(),
    CountryCode: data.countryCode || '+91',
    PhoneNumber: phoneNumber,
    ServiceId:   data.service ? (Number(data.service) || null) : null,
    Message:     data.message?.trim(),
  }

  const res = await fetch(`${BASE}/api/contactus/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let msg = `Server error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || d?.errorMessage || msg } catch (_) {}
    throw new Error(msg)
  }

  try {
    const d = await res.json()
    return { success: true, message: d?.message || 'Message sent successfully!' }
  } catch (_) {
    return { success: true, message: 'Message sent successfully!' }
  }
}

/** GET list of services from backend */
export async function getServiceList(includeInactive = false) {
  const res = await fetch(`${BASE}/api/ServiceOfInterest/list${includeInactive ? '?includeInactive=true' : ''}`)
  if (!res.ok) {
    let msg = `Server error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || d?.errorMessage || msg } catch (_) {}
    throw new Error(msg)
  }
  try {
    const d = await res.json()
    return d || []
  } catch (_) { return [] }
}

/** POST email to stay-updated endpoint */
export async function subscribeNewsletter(email, firstName = null) {
  // API path implemented in .NET: POST /api/stayupdated/subscribe
  const payload = {
    email: email.trim().toLowerCase(),
    firstName: firstName ? firstName.trim() : null,
  }
  const res = await fetch(`${BASE}/api/stayupdated/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    let msg = `Error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || msg } catch (_) {}
    throw new Error(msg)
  }
  try { const d = await res.json(); return d?.message || 'Subscribed!' } catch (_) { return 'Subscribed!' }
}

export async function unsubscribeNewsletter(email) {
  const res = await fetch(`${BASE}/api/stayupdated/unsubscribe?email=${encodeURIComponent(email)}`)
  if (!res.ok) {
    let msg = `Error (${res.status}).`
    try { const d = await res.json(); msg = d?.message || msg } catch (_) {}
    throw new Error(msg)
  }
  try { const d = await res.json(); return d?.message || 'Unsubscribed.' } catch (_) { return 'Unsubscribed.' }
}
