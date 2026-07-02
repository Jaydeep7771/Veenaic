import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
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

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
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
