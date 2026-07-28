import { MotionConfig } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Rail from './components/Rail'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import { LangProvider } from './i18n/useLang'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <AnimatedBackground />
        <div className="grid min-h-screen rail:grid-cols-[300px_1fr]">
          <Rail />
          <main className="max-w-[900px] px-6 pb-24 pt-10 rail:px-[clamp(24px,5vw,72px)]">
            <Hero />
            <Timeline />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
          </main>
        </div>
      </LangProvider>
    </MotionConfig>
  )
}
