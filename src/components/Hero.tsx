import { motion } from 'framer-motion'
import { content } from '../data/content'
import { Html, useLang } from '../i18n/useLang'

export default function Hero() {
  const { t } = useLang()

  return (
    <section id="intro" className="pb-16 pt-8 md:pb-20 md:pt-10">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal"
      >
        {content.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 max-w-[16ch] font-display text-[clamp(34px,5.6vw,60px)] font-extrabold leading-[1.02] tracking-[-0.035em] [&_em]:not-italic [&_em]:text-signal"
      >
        <Html text={content.thesis} />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-[56ch] text-[17px] text-paper-2"
      >
        {t(content.lede)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 max-w-[520px] rounded-xl border border-glass-border bg-glass py-1 backdrop-blur-md"
      >
        {content.status.map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-[18px] py-3 font-mono text-[12.5px] text-paper-2 ${
              i > 0 ? 'border-t border-glass-border' : ''
            }`}
          >
            <span
              className={`h-2 w-2 flex-none rounded-full ${
                row.dotVariant === 'active' ? 'animate-ping-slow bg-pulse' : 'bg-signal'
              }`}
            />
            <Html text={row.text} />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
