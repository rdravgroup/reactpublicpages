import React, { useState, useEffect, useRef, useCallback } from 'react'
import './DotNetStudyPage.css'
import images from '../data/dotnet-images.json'

export default function DotNetStudyPage() {
  const [selected, setSelected] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const lightboxRef = useRef(null)
  const innerRef = useRef(null)
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const pointerRef = useRef({ pointerId: null, startX: 0, startY: 0, lastX: 0, lastY: 0 })
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!selected) { setZoom(1); return }
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // Close lightbox when clicking anywhere outside the inner dialog.
  // Use capture phase to ensure we catch the event even if pointer capture is active.
  useEffect(() => {
    if (!selected) return
    const onDocPointer = (e) => {
      if (!innerRef.current) return
      if (!innerRef.current.contains(e.target)) setSelected(null)
    }
    document.addEventListener('pointerdown', onDocPointer, true)
    return () => document.removeEventListener('pointerdown', onDocPointer, true)
  }, [selected])

  const toggleFullscreen = useCallback(async () => {
    if (!lightboxRef.current) return
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else await lightboxRef.current.requestFullscreen()
    } catch (err) {
      // ignore
    }
  }, [])

  const zoomIn = () => setZoom(z => Math.min(3, +(z + 0.25).toFixed(2)))
  const zoomOut = () => setZoom(z => Math.max(0.5, +(z - 0.25).toFixed(2)))
  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }) }

  // clamp pan whenever zoom or selected changes
  useEffect(() => {
    if (!selected) { setPan({ x: 0, y: 0 }); return }
    const img = imageRef.current
    const cont = containerRef.current
    if (!img || !cont) return
    const baseW = img.clientWidth
    const baseH = img.clientHeight
    const scaledW = baseW * zoom
    const scaledH = baseH * zoom
    const maxX = Math.max(0, (scaledW - cont.clientWidth) / 2)
    const maxY = Math.max(0, (scaledH - cont.clientHeight) / 2)
    setPan(p => ({ x: Math.max(-maxX, Math.min(maxX, p.x)), y: Math.max(-maxY, Math.min(maxY, p.y)) }))
  }, [zoom, selected])

  const handlePointerDown = (e) => {
    // only left button for mouse
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if (!imageRef.current || !containerRef.current) return
    e.preventDefault()
    const el = e.currentTarget
    try { el.setPointerCapture(e.pointerId) } catch (_) {}
    pointerRef.current.pointerId = e.pointerId
    pointerRef.current.startX = e.clientX
    pointerRef.current.startY = e.clientY
    pointerRef.current.lastX = pan.x
    pointerRef.current.lastY = pan.y
    setDragging(true)
  }

  const handlePointerMove = (e) => {
    if (!pointerRef.current.pointerId) return
    if (e.pointerId !== pointerRef.current.pointerId) return
    e.preventDefault()
    const dx = e.clientX - pointerRef.current.startX
    const dy = e.clientY - pointerRef.current.startY
    let newX = pointerRef.current.lastX + dx
    let newY = pointerRef.current.lastY + dy
    const img = imageRef.current
    const cont = containerRef.current
    if (img && cont) {
      const baseW = img.clientWidth
      const baseH = img.clientHeight
      const scaledW = baseW * zoom
      const scaledH = baseH * zoom
      const maxX = Math.max(0, (scaledW - cont.clientWidth) / 2)
      const maxY = Math.max(0, (scaledH - cont.clientHeight) / 2)
      newX = Math.max(-maxX, Math.min(maxX, newX))
      newY = Math.max(-maxY, Math.min(maxY, newY))
    }
    setPan({ x: newX, y: newY })
  }

  const handlePointerUp = (e) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch (_) {}
    pointerRef.current.pointerId = null
    setDragging(false)
  }

  const q = query.trim().toLowerCase()
  const filtered = q ? images.filter(it => (
    (it.title || '').toLowerCase().includes(q) || (it.id || '').toLowerCase().includes(q)
    || (it.description?.body || '').toLowerCase().includes(q)
  )) : images

  const truncate = (s, n=120) => {
    if (!s) return ''
    return s.length > n ? s.slice(0, n).trim() + '…' : s
  }

  return (
    <div className="dotnet-study-container">
      <section className="study-header">
        <h1>.NET Core Web API — Study Material</h1>
        <p className="intro-text">Study material related to .NET Core Web API with Visual Studio — concise diagrams and notes.</p>
        <div className="search-row">
          <input
            type="search"
            className="search-input"
            placeholder="Search images by title or keyword"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search images"
          />
          {query && <button onClick={() => setQuery('')} className="btn btn-clear">Clear</button>}
        </div>
        {q && <div className="results-count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</div>}
      </section>

      <section className="cards-grid">
        {filtered.map((it, i) => (
          <article key={it.id || i} className="dotnet-card">
            <button className="thumb-btn" onClick={() => setSelected(it)} aria-label={`Open ${it.title || 'image'}`}>
              <img src={it.url} alt={it.title || `Image ${i+1}`} loading="lazy" className="thumb-img" />
            </button>
              <div className="card-meta">
                <div className="card-title">{it.title || `Image ${i+1}`}</div>
                {it.description?.body && <div className="card-desc">{truncate(it.description.body, 120)}</div>}
              </div>
          </article>
        ))}
      </section>
      {filtered.length === 0 && <p className="no-results">No images match your search.</p>}

      {selected && (
        <div className="dotnet-lightbox" role="dialog" aria-modal="true" onClick={() => setSelected(null)} ref={lightboxRef}>
          <div className="dotnet-lightbox-inner" ref={innerRef} onClick={(e) => e.stopPropagation()}>
            <div className={`lightbox-media${dragging ? ' grabbing' : ''}`} ref={containerRef}
              onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
              <div className="lightbox-img-wrap" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
                <img ref={imageRef} src={selected.url} alt={selected.title} className="lightbox-img" style={{ transform: `scale(${zoom})` }} />
              </div>
            </div>
            {selected.description?.body && (
              <div className="lightbox-desc">
                <p>{selected.description.body}</p>
              </div>
            )}
            <div className="lightbox-actions">
              <div className="zoom-controls">
                <button onClick={zoomOut} className="btn">−</button>
                <button onClick={() => { resetZoom(); setPan({ x: 0, y: 0 }) }} className="btn">Fit</button>
                <button onClick={zoomIn} className="btn">+</button>
              </div>
              <a href={selected.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Open in new tab</a>
              <a href={selected.url} download className="btn btn-download">Download</a>
              <button onClick={toggleFullscreen} className="btn btn-maximize">{isFullscreen ? 'Exit Fullscreen' : 'Maximize'}</button>
              <button onClick={() => setSelected(null)} className="btn btn-close">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
