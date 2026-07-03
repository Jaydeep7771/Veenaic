import { useEffect } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Scene3D from './three/Scene3D'
import { startScrollTracking } from './three/scrollStore'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Cta from './components/Cta'
import Contact from './components/Contact'
import Footer from './components/Footer'
import useReveal from './hooks/useReveal'

export default function App() {
  useReveal()

  useEffect(() => {
    return startScrollTracking()
  }, [])

  return (
    <>
      <Preloader />
      <Scene3D />
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <Cta />
      <Contact />
      <Footer />
    </>
  )
}
