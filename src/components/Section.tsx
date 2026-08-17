import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { LocalizedText } from '../data/content'
import { useLang } from '../i18n/useLang'

interface SectionProps {
  id: string
  /** Numéro d'ordre affiché en mono à côté du titre, ex. « 02 ». */
  index: string
  title: LocalizedText
  kicker?: LocalizedText
  children: ReactNode
}

/**
 * Enveloppe commune à toutes les sections : ancre de navigation, en-tête
 * numérotée, et révélation au scroll une seule fois.
 */
export default function Section({ id, index, title, kicker, children }: SectionProps) {
  const { t } = useLang()

  return (
    <section id={id} className="relative scroll-mt-24 py-16 nav:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="mb-10 nav:mb-14">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-2">
            <span className="text-violet">{index}</span>
            <span className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
            {kicker ? <span>{t(kicker)}</span> : null}
          </div>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight nav:text-[2.75rem]">
            <span className="text-gradient">{t(title)}</span>
          </h2>
        </header>

        {children}
      </motion.div>
    </section>
  )
}
