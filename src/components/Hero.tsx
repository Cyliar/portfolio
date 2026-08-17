import { motion } from 'framer-motion'
import { content } from '../data/content'
import { Html, useLang } from '../i18n/useLang'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center py-24 nav:py-28"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        className="grid w-full items-center gap-14 nav:grid-cols-[1.35fr_1fr] nav:gap-16"
      >
        <div>
          <motion.div
            variants={rise}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M6 1c2 2.2 3.5 3.8 3.5 6a3.5 3.5 0 11-7 0C2.5 4.8 4 3.2 6 1z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
              </svg>
              {content.eyebrow}
            </span>

            {content.status.slice(0, 1).map((row) => (
              <span
                key={row.text.fr}
                className="inline-flex items-center gap-2.5 rounded-full border border-amber/30 bg-amber/[0.08] px-3 py-1.5 text-[12px] text-amber"
              >
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-amber/70 animate-halo-pulse" />
                  <span className="h-2 w-2 rounded-full bg-amber" />
                </span>
                {t(row.text)}
              </span>
            ))}
          </motion.div>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[clamp(2.9rem,10vw,5.75rem)] font-bold leading-[0.92] tracking-[-0.03em]"
          >
            <span className="block text-text">Rania</span>
            <span className="block text-gradient">Lasfar</span>
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-xl text-muted nav:text-2xl"
          >
            {t(content.role)}
          </motion.p>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl font-display text-2xl leading-snug text-text nav:text-[1.9rem]"
          >
            <Html text={content.thesis} />
          </motion.p>

          <motion.p
            variants={rise}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
          >
            {t(content.lede)}
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">
                {t({ fr: 'Voir mes projets', en: 'See my projects' })}
              </span>
              {/* Reflet qui balaie le bouton au survol. */}
              <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/35 opacity-0 group-hover:animate-sheen group-hover:opacity-100" />
            </a>

            <a
              href={content.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-text transition-colors hover:border-cyan hover:text-cyan"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M7 1v8m0 0L4 6m3 3l3-3M1 12h12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              {t({ fr: 'Télécharger mon CV', en: 'Download my CV' })}
            </a>
          </motion.div>
        </div>

        {/* Portrait : anneau dégradé, halo diffus, léger flottement au survol. */}
        <motion.div
          variants={rise}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="order-first mx-auto w-[min(74vw,320px)] nav:order-none nav:w-full nav:max-w-[380px]"
        >
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  'conic-gradient(from 200deg, rgba(124,92,255,0.55), rgba(34,211,238,0.5), rgba(244,114,182,0.4), rgba(124,92,255,0.55))',
              }}
            />

            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="relative rounded-full p-[2px]"
              style={{
                background:
                  'conic-gradient(from 140deg, #7C5CFF, #22D3EE 40%, #F472B6 70%, #7C5CFF)',
              }}
            >
              <img
                src={content.photo}
                width={576}
                height={576}
                alt={`${content.name} — ${t(content.role)}`}
                className="block w-full rounded-full bg-surface"
              />
            </motion.div>

            {/* Étiquette flottante : rappelle le rôle sans alourdir le texte. */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-void/85 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur">
              {t({ fr: 'IA · Data · RPA', en: 'AI · Data · RPA' })}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Indice de défilement, discret, absent si mouvement réduit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 nav:block"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-cyan animate-scroll-hint" />
        </span>
      </div>
    </section>
  )
}
