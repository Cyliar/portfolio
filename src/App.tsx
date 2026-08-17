import { MotionConfig } from 'framer-motion'
import { LangProvider } from './i18n/useLang'
import Aurora from './components/Aurora'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    // reducedMotion="user" neutralise les animations de transform quand le
    // système le demande, tout en conservant les fondus d'opacité.
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <div className="grain relative min-h-screen">
          <Aurora />
          <Header />

          <div className="relative z-10 mx-auto max-w-shell px-5 nav:px-8">
            <Hero />
            <Stats />
          </div>

          <div className="relative z-10 mt-16">
            <Marquee />
          </div>

          <main className="relative z-10 mx-auto max-w-shell px-5 nav:px-8">
            <About />
            <Projects />
            <Timeline />
            <Skills />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </div>
      </LangProvider>
    </MotionConfig>
  )
}
