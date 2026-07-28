import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Certifications() {
  const { t } = useLang()

  return (
    <section id="certifs" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        04 — {t({ fr: 'Certifications', en: 'Certifications' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: "Ce que j'ai validé", en: "What I've certified" })}
      </h2>

      <ul className="overflow-hidden rounded-xl border border-glass-border">
        {content.certifications.map((cert, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ backgroundColor: 'rgba(124,92,255,0.08)' }}
            className={`flex flex-wrap items-baseline justify-between gap-4 bg-glass px-5 py-4 transition-colors ${
              i > 0 ? 'border-t border-glass-border' : ''
            }`}
          >
            <span>{t(cert.title)}</span>
            <span className="font-mono text-xs text-paper-2">{cert.issuer}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
