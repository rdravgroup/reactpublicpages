import React, { createContext, useContext, useState } from 'react'
import PrivacyModal from '../components/Modal/PrivacyModal.jsx'

const PrivacyModalContext = createContext(null)

export function PrivacyModalProvider({ children }) {
  const [open, setOpen] = useState(false)
  const showPrivacy = () => setOpen(true)
  const hidePrivacy = () => setOpen(false)

  return (
    <PrivacyModalContext.Provider value={{ showPrivacy, hidePrivacy }}>
      <PrivacyModal open={open} onClose={hidePrivacy} />
      {children}
    </PrivacyModalContext.Provider>
  )
}

export function usePrivacyModal() {
  const ctx = useContext(PrivacyModalContext)
  if (!ctx) throw new Error('usePrivacyModal must be used within PrivacyModalProvider')
  return ctx
}
