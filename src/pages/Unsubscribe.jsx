import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { unsubscribeNewsletter } from '../utils/contactApi.js'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function Unsubscribe() {
  const query = useQuery()
  const email = query.get('email') || ''
  const [status, setStatus] = useState('loading') // loading | ok | err
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!email) {
      setStatus('err')
      setMsg('No email provided.')
      return
    }
    (async () => {
      try {
        const m = await unsubscribeNewsletter(email)
        setStatus('ok')
        setMsg(m || 'You have been unsubscribed.')
      } catch (err) {
        setStatus('err')
        setMsg(err?.message || 'Unable to unsubscribe.')
      }
    })()
  }, [email])

  return (
    <div className="page page--center">
      <div className="container">
        <h2>Unsubscribe</h2>
        {status === 'loading' && <p>Processing unsubscribe for <strong>{email}</strong>…</p>}
        {status === 'ok' && <p>✓ {msg}</p>}
        {status === 'err' && <p>⚠ {msg}</p>}
        <p><Link to="/">Return to home</Link></p>
      </div>
    </div>
  )
}
