import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-line py-10">
      <div className="flex flex-col items-start justify-between gap-4 text-[13px] text-muted-2 nav:flex-row nav:items-center">
        <p>
          © {new Date().getFullYear()} {content.name} — {t(content.role)}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={content.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            LinkedIn
          </a>
          <a
            href={content.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
          >
            GitHub
          </a>
          <a href="#top" className="transition-colors hover:text-text">
            {t({ fr: 'Haut de page ↑', en: 'Back to top ↑' })}
          </a>
        </div>
      </div>
    </footer>
  )
}
