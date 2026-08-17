import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import Section from './Section'

export default function Certifications() {
  const { t } = useLang()

  return (
    <Section
      id="certifications"
      index="05"
      kicker={{ fr: 'Formation continue', en: 'Continuous learning' }}
      title={{ fr: 'Certifications', en: 'Certifications' }}
    >
      <div className="grid gap-3 nav:grid-cols-2">
        {content.certifications.map((certification, index) => (
          <motion.article
            key={certification.title.fr}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="glass group flex items-center gap-4 rounded-xl px-5 py-4 transition-colors hover:border-line-strong"
          >
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet/25 to-cyan/25 text-cyan"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .75 4.3L8 11.3l-3.85 2-.75-4.3-3.1-3 4.3-.6L8 1.5z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-medium text-text">
                {t(certification.title)}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2">
                {certification.issuer}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
