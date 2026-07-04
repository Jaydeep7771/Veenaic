import { useEffect, useState } from 'react'

const navItems = [
  { href: '#work', label: 'Products' },
  { href: '#services', label: 'Missions' },
  { href: '#process', label: 'Method' },
  { href: '#contact', label: 'Brief' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" aria-label="Veeniac home">
        <span className="logo-mark">V</span>
        <span className="logo-stack">
          <span className="logo-text">Veeniac</span>
          <span className="logo-sub">Product Lab</span>
        </span>
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav-cta">Start a build</a>
      </div>
    </nav>
  )
}
