import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Timeline() {
  const { t } = useLang()

  return (
    <section id="parcours" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        01 — {t({ fr: 'Parcours', en: 'Experience' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Là où j'ai travaillé", en: "Where I've worked" })}
      </h2>

      <div className="relative pl-7">
        <div className="absolute bottom-1.5 left-[3px] top-1.5 w-px bg-glass-border" />
        {content.timeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative py-4"
          >
            <div className="absolute -left-7 top-6 h-1.5 w-1.5 rounded-full border-2 border-signal bg-ink" />
            <div className="font-mono text-xs tracking-wide text-signal">{t(step.date)}</div>
            <div className="mt-1 text-[17px] font-semibold">{t(step.title)}</div>
            <div className="mt-0.5 font-mono text-[12.5px] text-paper-2">{step.org}</div>
            {step.missions ? (
              <ul className="mt-2 max-w-[62ch] list-disc space-y-1 pl-4 text-[15px] text-paper-2">
                {step.missions.map((mission, j) => (
                  <li key={j}>{t(mission)}</li>
                ))}
              </ul>
            ) : step.description ? (
              <p className="mt-2 max-w-[62ch] text-[15px] text-paper-2">{t(step.description)}</p>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
