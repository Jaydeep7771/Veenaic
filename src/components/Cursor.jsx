import { useEffect, useRef } from 'react'

const HOVER_SELECTOR = 'a,button,.product-card,.services-list-item'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mx = 0, my = 0, rx = 0, ry = 0
    let scale = 1
    let raf

    const applyCursor = () => {
      cursor.style.transform = `translate(${mx - 5}px,${my - 5}px) scale(${scale})`
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      applyCursor()
    }
    document.addEventListener('mousemove', onMove, { passive: true })

    const animRing = () => {
      rx += (mx - rx) * 0.35
      ry += (my - ry) * 0.35
      ring.style.transform = `translate(${rx - 18}px,${ry - 18}px)`
      raf = requestAnimationFrame(animRing)
    }
    animRing()

    // Event delegation so dynamically rendered elements get hover styling too
    const onOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        scale = 2.5
        cursor.style.background = '#D9FF3C'
        applyCursor()
      }
    }
    const onOut = (e) => {
      if (e.target.closest(HOVER_SELECTOR) && !e.relatedTarget?.closest(HOVER_SELECTOR)) {
        scale = 1
        cursor.style.background = '#f0eee8'
        applyCursor()
      }
    }
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  )
}
