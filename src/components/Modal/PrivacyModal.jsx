import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import PrivacyContent from '../Privacy/PrivacyContent.jsx'

const ANIM_MS = 220

export default function PrivacyModal({ open, onClose }) {
  const [visible, setVisible] = useState(open)
  const [exiting, setExiting] = useState(false)
  const overlayRef = useRef(null)
  const closeBtnRef = useRef(null)
  const prevActiveRef = useRef(null)

  useEffect(() => {
    if (open) {
      prevActiveRef.current = document.activeElement
      setVisible(true)
      setExiting(false)
    } else if (visible) {
      setExiting(true)
      const t = setTimeout(() => {
        setExiting(false)
        setVisible(false)
      }, ANIM_MS)
      return () => clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!visible) return

    // focus first sensible element (close button) and trap focus
    const root = overlayRef.current
    const focusable = root?.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
    const focusList = Array.from(focusable).filter(el => !el.hasAttribute('disabled'))
    const first = closeBtnRef.current || focusList[0]
    first?.focus()

    function onKey(e) {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'Tab') {
        if (focusList.length === 0) {
          e.preventDefault(); return
        }
        const idx = focusList.indexOf(document.activeElement)
        if (e.shiftKey) {
          if (idx === 0) {
            e.preventDefault(); focusList[focusList.length - 1].focus()
          }
        } else {
          if (idx === focusList.length - 1) {
            e.preventDefault(); focusList[0].focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      // restore focus
      try { prevActiveRef.current?.focus?.() } catch (e) { /* ignore */ }
    }
  }, [visible, onClose])

  if (!visible) return null

  const overlayClass = `modal-overlay ${exiting ? 'modal-exit' : 'modal-enter'}`
  const cardClass = `modal-card ${exiting ? 'modal-exit' : 'modal-enter'}`

  return createPortal(
    <div className={overlayClass} role="dialog" aria-modal="true" onClick={onClose} ref={overlayRef}>
      <div className={cardClass} onClick={e => e.stopPropagation()}>
        <button ref={closeBtnRef} className="modal-close" aria-label="Close" onClick={onClose}>×</button>
        <PrivacyContent />
      </div>
    </div>,
    document.body
  )
}
