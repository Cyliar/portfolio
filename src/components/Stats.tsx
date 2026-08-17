import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

/** Compte de 0 à `target` une fois l'élément visible. */
function useCountUp(target: number, active: boolean, duration = 900) {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    if (reduced) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Sortie en douceur : rapide au début, freine sur la fin.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration, reduced])

  return value
}

function StatCard({ value, label, active }: { value: number; label: string; active: boolean }) {
  const shown = useCountUp(value, active)

  return (
    <div className="glass rounded-2xl px-5 py-6 text-center">
      <div className="font-display text-4xl font-bold tabular-nums nav:text-5xl">
        <span className="text-gradient">{shown}</span>
      </div>
      <div className="mt-2 text-[13px] leading-snug text-muted">{label}</div>
    </div>
  )
}

export default function Stats() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 gap-3 nav:grid-cols-4 nav:gap-4"
    >
      {content.stats.map((stat) => (
        <StatCard
          key={stat.label.fr}
          value={stat.value}
          label={t(stat.label)}
          active={inView}
        />
      ))}
    </motion.div>
  )
}
