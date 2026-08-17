import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import ContactForm from './ContactForm'
import Section from './Section'

interface Channel {
  label: string
  value: string
  href: string
  external?: boolean
}

export default function Contact() {
  const { t } = useLang()

  const channels: Channel[] = [
    { label: 'Email', value: content.contact.email, href: `mailto:${content.contact.email}` },
    {
      label: t({ fr: 'Téléphone', en: 'Phone' }),
      value: content.contact.phone,
      // Le lien tel: n'accepte pas d'espaces.
      href: `tel:${content.contact.phone.replace(/\s/g, '')}`,
    },
    {
      label: 'LinkedIn',
      value: '/in/rania-lasfar',
      href: content.contact.linkedin,
      external: true,
    },
    { label: 'GitHub', value: '@Cyliar', href: content.contact.github, external: true },
  ]

  return (
    <Section
      id="contact"
      index="06"
      kicker={{ fr: 'Contact', en: 'Contact' }}
      title={{ fr: 'Travaillons ensemble', en: 'Let’s work together' }}
    >
      <div className="grid gap-10 nav:grid-cols-[1fr_1.1fr] nav:gap-14">
        <div>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            {t(content.contact.text)}
          </p>

          <ul className="mt-8 space-y-3">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="glass group flex items-center justify-between gap-4 rounded-xl px-5 py-3.5 transition-colors hover:border-line-strong"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-2">
                    {channel.label}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-text">
                    {channel.value}
                    <span
                      aria-hidden
                      className="text-cyan transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </Section>
  )
}
