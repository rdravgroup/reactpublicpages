/**
 * visitorApi.js — Visitor counter for CodeXClear
 *
 * Architecture:
 *   PRIMARY:  POST /api/visitors/ping  → records visit, returns live stats
 *   FALLBACK: localStorage-based estimate (works offline / during dev)
 *
 * Session deduplication:
 *   A sessionId is created once per browser tab (sessionStorage).
 *   The API uses this to count unique sessions vs total page views.
 *
 * Bot filtering:
 *   Handled server-side (User-Agent check in .NET controller).
 *   Client-side: we skip the ping if the tab is hidden (prerendering bots).
 */

const BASE = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL ?? 'https://sanjulogin.runasp.net')

// Keys for localStorage fallback
const LS_TOTAL_KEY   = 'cxc_visitor_total'
const LS_SESSION_KEY = 'cxc_visitor_session'
const SS_ID_KEY      = 'cxc_session_id'
const SS_PINGED_KEY  = 'cxc_pinged'

/** Generate a lightweight random session ID (no external lib needed) */
function generateSessionId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 9)
  ).toUpperCase()
}

/** Get or create a session ID for this browser tab */
function getSessionId() {
  let sid = sessionStorage.getItem(SS_ID_KEY)
  if (!sid) {
    sid = generateSessionId()
    sessionStorage.setItem(SS_ID_KEY, sid)
  }
  return sid
}

/** Check if we already pinged during this session (avoid double-counting) */
function alreadyPinged() {
  return sessionStorage.getItem(SS_PINGED_KEY) === '1'
}
function markPinged() {
  sessionStorage.setItem(SS_PINGED_KEY, '1')
}

/**
 * LocalStorage fallback — increments a local counter when API is unavailable.
 * Uses a per-session flag so it only increments once per tab open.
 * NOTE: This is per-device, not global — use only as a development placeholder.
 */
function getFallbackStats() {
  let total   = parseInt(localStorage.getItem(LS_TOTAL_KEY)   || '0', 10)
  let session = parseInt(localStorage.getItem(LS_SESSION_KEY) || '0', 10)

  if (!alreadyPinged()) {
    total   += 1
    session += 1
    localStorage.setItem(LS_TOTAL_KEY,   String(total))
    localStorage.setItem(LS_SESSION_KEY, String(session))
    markPinged()
  }

  return {
    totalVisits:    total,
    uniqueVisitors: Math.max(1, Math.floor(total * 0.72)), // rough estimate: 72% unique
    onlineNow:      1,
    source:         'local',
  }
}

/**
 * Ping the API to record this visit and get live stats.
 * Returns a stats object:
 *   { totalVisits, uniqueVisitors, onlineNow, source: 'api' | 'local' }
 */
export async function pingVisitor() {
  // Skip if tab is hidden (bots / prerendering)
  if (document.visibilityState === 'hidden') {
    return getFallbackStats()
  }

  const sessionId = getSessionId()
  const isNew     = !alreadyPinged()

  try {
    const res = await fetch(`${BASE}/api/visitors/ping`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        sessionId,
        isNewSession: isNew,
        pageUrl:      window.location.pathname,
        referrer:     document.referrer || null,
        userAgent:    navigator.userAgent,
      }),
      // Short timeout — don't block rendering
      signal: AbortSignal.timeout(4000),
    })

    if (!res.ok) throw new Error(`API ${res.status}`)

    const data = await res.json()
    markPinged()

    return {
      totalVisits:    data.totalVisits    ?? data.TotalVisits    ?? 0,
      uniqueVisitors: data.uniqueVisitors ?? data.UniqueVisitors ?? 0,
      onlineNow:      data.onlineNow      ?? data.OnlineNow      ?? 1,
      source:         'api',
    }
  } catch (_) {
    // API unavailable → use localStorage fallback silently
    return getFallbackStats()
  }
}

/**
 * Get current stats without recording a new visit (for display refresh).
 */
export async function getVisitorStats() {
  try {
    const res = await fetch(`${BASE}/api/visitors/stats`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) throw new Error(`API ${res.status}`)
    const data = await res.json()
    return {
      totalVisits:    data.totalVisits    ?? data.TotalVisits    ?? 0,
      uniqueVisitors: data.uniqueVisitors ?? data.UniqueVisitors ?? 0,
      onlineNow:      data.onlineNow      ?? data.OnlineNow      ?? 1,
      source:         'api',
    }
  } catch (_) {
    const total = parseInt(localStorage.getItem(LS_TOTAL_KEY) || '0', 10)
    return {
      totalVisits:    total,
      uniqueVisitors: Math.max(1, Math.floor(total * 0.72)),
      onlineNow:      1,
      source:         'local',
    }
  }
}
