import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

const navItems = [
  { href: '#intro', fr: 'Profil', en: 'Profile' },
  { href: '#parcours', fr: 'Parcours', en: 'Experience' },
  { href: '#projets', fr: 'Projets', en: 'Projects' },
  { href: '#stack', fr: 'Compétences', en: 'Skills' },
  { href: '#certifs', fr: 'Certifications', en: 'Certifications' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
]

export default function Rail() {
  const { lang, setLang, t } = useLang()
  const [firstName, lastName] = content.name.split(' ')

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-7 border-glass-border bg-ink/60 p-7 backdrop-blur-md rail:sticky rail:top-0 rail:h-screen rail:w-[300px] rail:border-r"
    >
      <div>
        <div className="font-display text-3xl font-extrabold leading-tight tracking-tight">
          {firstName}
          <br />
          {lastName}
        </div>
        <div className="mt-2.5 font-mono text-[11.5px] uppercase tracking-widest text-paper-2">
          {t(content.role)}
        </div>
      </div>

      <nav className="flex flex-row flex-wrap gap-1 rail:flex-col rail:gap-0.5">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="border-b-2 border-glass-border py-1.5 pl-4 font-mono text-[12.5px] text-paper-2 transition-all hover:border-signal hover:pl-6 hover:text-signal rail:border-b-0 rail:border-l-2"
          >
            {lang === 'fr' ? item.fr : item.en}
          </a>
        ))}
      </nav>

      <div className="flex flex-row flex-wrap items-end justify-between gap-3.5 rail:mt-auto rail:flex-col rail:items-start">
        <div className="flex w-max overflow-hidden rounded-full border border-glass-border bg-glass">
          {(['fr', 'en'] as const).map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={`px-3.5 py-1.5 font-mono text-[11.5px] tracking-wider transition-colors ${
                lang === l ? 'bg-signal text-white' : 'text-paper-2'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 font-mono text-xs">
          <a
            href={content.contact.linkedin}
            target="_blank"
            rel="noopener"
            className="text-paper-2 transition-colors hover:text-signal"
          >
            LinkedIn ↗
          </a>
          <a
            href={content.contact.github}
            target="_blank"
            rel="noopener"
            className="text-paper-2 transition-colors hover:text-signal"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.aside>
  )
}
