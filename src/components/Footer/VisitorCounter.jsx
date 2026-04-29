import React, { useState, useEffect, useCallback } from 'react'
import { pingVisitor, getVisitorStats } from '../../utils/visitorApi.js'
import './VisitorCounter.css'

/**
 * VisitorCounter — displays live visitor stats in the footer.
 *
 * Behaviour:
 *  • On first mount: calls pingVisitor() to record the visit & get stats
 *  • Every 60 seconds: silently refreshes stats (onlineNow may change)
 *  • Numbers animate from 0 → final value on first load
 *  • Shows a subtle "live" indicator while fetching
 *  • If source === 'local', shows a "(local)" badge for dev awareness
 */

function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!value) return
    let start = null
    const from = display
    const to   = value

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const ease     = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(from + (to - from) * ease))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span>{display.toLocaleString('en-IN')}</span>
}

export default function VisitorCounter() {
  const [stats,   setStats]   = useState(null)     // null = loading
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  // Initial ping — records this visit
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const s = await pingVisitor()
        if (!cancelled) { setStats(s); setLoading(false) }
      } catch (_) {
        if (!cancelled) { setError(true); setLoading(false) }
      }
    })()
    return () => { cancelled = true }
  }, [])

  // Refresh stats every 60 seconds (onlineNow ticks)
  const refresh = useCallback(async () => {
    try {
      const s = await getVisitorStats()
      setStats(s)
    } catch (_) {}
  }, [])

  useEffect(() => {
    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [refresh])

  // Don't render until we have something to show
  if (error || (!loading && !stats)) return null

  return (
    <div className="visitor-counter" aria-label="Site visitor statistics">

      {loading ? (
        /* Skeleton while loading */
        <div className="vc-skeleton">
          <span className="vc-skeleton__dot" />
          <span className="vc-skeleton__bar" style={{ width: 180 }} />
        </div>
      ) : (
        <div className="vc-stats">

          {/* Total visits */}
          <div className="vc-stat">
            <span className="vc-stat__icon" aria-hidden="true">👁</span>
            <span className="vc-stat__value">
              <AnimatedNumber value={stats.totalVisits} />
            </span>
            <span className="vc-stat__label">total visits</span>
          </div>

          <span className="vc-sep" aria-hidden="true">·</span>

          {/* Unique visitors */}
          <div className="vc-stat">
            <span className="vc-stat__icon" aria-hidden="true">👤</span>
            <span className="vc-stat__value">
              <AnimatedNumber value={stats.uniqueVisitors} />
            </span>
            <span className="vc-stat__label">unique visitors</span>
          </div>

          <span className="vc-sep" aria-hidden="true">·</span>

          {/* Online now */}
          <div className="vc-stat">
            <span className="vc-online-dot" aria-hidden="true" />
            <span className="vc-stat__value">{stats.onlineNow}</span>
            <span className="vc-stat__label">online now</span>
          </div>

          {/* Dev-mode badge — only shown when using localStorage fallback */}
          {stats.source === 'local' && (
            <span className="vc-local-badge" title="API unavailable — showing local estimate">
              local
            </span>
          )}
        </div>
      )}
    </div>
  )
}
