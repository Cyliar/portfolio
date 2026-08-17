import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

/**
 * Renvoie l'id de la section traversée par une ligne de référence située au
 * tiers supérieur de l'écran, ou une chaîne vide si aucune ne l'est — c'est le
 * cas sur le hero, où aucun onglet ne doit s'allumer.
 *
 * Le calcul se fait au défilement plutôt qu'avec un IntersectionObserver :
 * l'observateur ne signalait rien quand une section quittait sa bande de
 * détection sans qu'une autre y entre, et l'onglet actif restait figé sur une
 * valeur périmée.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    let frame = 0

    const compute = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = ''

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        const { top, bottom } = element.getBoundingClientRect()
        if (top <= line && bottom > line) {
          current = id
          break
        }
      }

      // En bas de page, la dernière section reste active même si sa fin est
      // passée au-dessus de la ligne de référence.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (!current && atBottom) current = ids[ids.length - 1]

      setActive(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ids])

  return active
}

export default function Header() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Mémoïsé : sinon un nouveau tableau à chaque rendu recrée l'observateur.
  const ids = useMemo(() => content.nav.map((item) => item.id), [])
  const active = useActiveSection(ids)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Empêche le défilement du fond quand le menu plein écran est ouvert.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line bg-void/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-4 px-5 nav:h-20 nav:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-cyan text-[13px] font-bold text-void">
              RL
            </span>
            <span className="hidden text-text sm:block">{content.name}</span>
          </a>

          <nav className="hidden items-center gap-1 nav:flex" aria-label="Sections">
            {content.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                  active === item.id ? 'text-text' : 'text-muted hover:text-text'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-line"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t(item.label)}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div
              className="flex overflow-hidden rounded-full border border-line text-[11px] font-medium"
              role="group"
              aria-label={t({ fr: 'Choix de la langue', en: 'Language' })}
            >
              {(['fr', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-2.5 py-1.5 uppercase transition-colors ${
                    lang === code ? 'bg-white/10 text-text' : 'text-muted-2 hover:text-text'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <a
              href={content.cv}
              download
              className="hidden rounded-full bg-gradient-to-r from-violet to-cyan px-4 py-2 text-[13px] font-semibold text-void transition-transform hover:scale-[1.03] sm:block"
            >
              {t({ fr: 'Mon CV', en: 'My CV' })}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t({ fr: 'Ouvrir le menu', en: 'Open menu' })}
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-text nav:hidden"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Barre de progression du défilement. */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-violet via-cyan to-magenta"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-void/95 backdrop-blur-xl nav:hidden"
          >
            <div className="flex h-16 items-center justify-end px-5">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t({ fr: 'Fermer le menu', en: 'Close menu' })}
                autoFocus
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:text-text"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <nav className="mt-4 flex flex-col px-6" aria-label="Sections">
              {content.nav.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05 }}
                  className="border-b border-line py-4 font-display text-2xl font-medium text-text"
                >
                  <span className="mr-3 font-mono text-xs text-violet">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {t(item.label)}
                </motion.a>
              ))}

              <a
                href={content.cv}
                download
                onClick={() => setMenuOpen(false)}
                className="mt-8 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-3 text-center text-sm font-semibold text-void"
              >
                {t({ fr: 'Télécharger mon CV', en: 'Download my CV' })}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
