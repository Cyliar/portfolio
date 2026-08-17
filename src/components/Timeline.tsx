import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import Section from './Section'

export default function Timeline() {
  const { t } = useLang()

  return (
    <Section
      id="timeline"
      index="03"
      kicker={{ fr: 'Parcours', en: 'Experience' }}
      title={{ fr: 'Là où j’ai appris le métier', en: 'Where I learned the craft' }}
    >
      <ol className="relative">
        {/* Filet vertical reliant les étapes, estompé vers le bas. */}
        <span
          aria-hidden
          className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-cyan/40 to-transparent"
        />

        {content.timeline.map((step, index) => (
          <motion.li
            key={`${step.org}-${step.date.fr}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-10 pl-9 last:pb-0"
          >
            <span className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center">
              {step.current && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-amber/60 animate-halo-pulse"
                />
              )}
              <span
                className={`h-[9px] w-[9px] rounded-full ring-4 ring-void ${
                  step.current ? 'bg-amber' : 'bg-violet'
                }`}
              />
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan/80">
                {t(step.date)}
              </span>
              {step.current && (
                <span className="rounded-full border border-amber/30 bg-amber/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-amber">
                  {t({ fr: 'en cours', en: 'current' })}
                </span>
              )}
            </div>

            <h3 className="mt-2 font-display text-lg font-semibold text-text nav:text-xl">
              {t(step.title)}
            </h3>
            <p className="mt-0.5 text-sm text-muted-2">{step.org}</p>

            {step.description && (
              <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                {t(step.description)}
              </p>
            )}

            {step.missions && (
              <ul className="mt-3 max-w-2xl space-y-2">
                {step.missions.map((mission) => (
                  <li
                    key={mission.fr}
                    className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted"
                  >
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {t(mission)}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
