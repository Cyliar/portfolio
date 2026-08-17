import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import Section from './Section'

export default function About() {
  const { t } = useLang()

  return (
    <Section
      id="about"
      index="01"
      kicker={{ fr: 'À propos', en: 'About' }}
      title={{ fr: 'Anticiper plutôt que constater', en: 'Anticipate rather than react' }}
    >
      <div className="grid gap-10 nav:grid-cols-[1.5fr_1fr] nav:gap-14">
        <div className="space-y-5">
          {content.about.map((paragraph) => (
            <p key={paragraph.fr} className="text-[15px] leading-relaxed text-muted nav:text-base">
              {t(paragraph)}
            </p>
          ))}
        </div>

        <aside className="glass h-max rounded-2xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">
            {t({ fr: 'Disponibilité', en: 'Availability' })}
          </h3>

          <ul className="mt-4 space-y-3.5">
            {content.status.map((row) => (
              <li key={row.text.fr} className="flex items-start gap-3 text-sm text-muted">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    row.dotVariant === 'active' ? 'bg-amber' : 'bg-cyan/60'
                  }`}
                />
                <span dangerouslySetInnerHTML={{ __html: t(row.text) }} />
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan transition-colors hover:text-text"
            >
              {t({ fr: 'Prendre contact', en: 'Get in touch' })}
              <span aria-hidden>→</span>
            </a>
          </div>
        </aside>
      </div>
    </Section>
  )
}
