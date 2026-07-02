import { useEffect, useRef } from 'react'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.style.padding = '1rem 3rem'
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.07)'
        nav.style.backdropFilter = 'blur(20px)'
        nav.style.background = 'rgba(4,5,8,0.8)'
      } else {
        nav.style.padding = '1.6rem 3rem'
        nav.style.borderBottom = 'none'
        nav.style.backdropFilter = 'none'
        nav.style.background = 'transparent'
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef}>
      <a href="#" className="nav-logo">
        <div className="logo-mark">V</div>
        <span className="logo-text">Veeniac</span>
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          <li><a href="#work">Products</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Let's talk</a>
      </div>
    </nav>
  )
}
