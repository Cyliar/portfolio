import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Skills() {
  const { t } = useLang()

  return (
    <section id="stack" className="border-t border-glass-border py-16 md:py-20">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        03 — {t({ fr: 'Compétences', en: 'Skills' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: 'Mes outils', en: 'My toolkit' })}
      </h2>

      {content.skills.map((group, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="mb-6"
        >
          <h3 className="mb-2.5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-paper-2">
            {t(group.title)}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item, j) => (
              <motion.span
                key={j}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.3, delay: i * 0.05 + j * 0.03 }}
                whileHover={{ y: -2, borderColor: '#7C5CFF' }}
                className="rounded-lg border border-glass-border bg-glass px-3.5 py-1.5 text-sm transition-colors"
              >
                {t(item)}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  )
}
