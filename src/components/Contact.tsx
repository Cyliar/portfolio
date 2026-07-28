import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'
import ContactForm from './ContactForm'

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="border-t border-glass-border py-16 md:py-24">
      <p className="mb-5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-signal">
        05 — {t({ fr: 'Contact', en: 'Contact' })}
      </p>
      <h2 className="mb-7 font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
        {t({ fr: 'Parlons-en', en: "Let's talk" })}
      </h2>
      <p className="max-w-[62ch] text-paper-2">{t(content.contact.text)}</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex flex-wrap gap-2.5"
      >
        <a
          href={`mailto:${content.contact.email}`}
          className="rounded-lg border border-signal bg-signal px-5 py-2.5 font-mono text-[13px] text-white transition-colors hover:bg-[#6a4ee0]"
        >
          {content.contact.email}
        </a>
        <a
          href={`tel:${content.contact.phone.replace(/\s/g, '')}`}
          className="rounded-lg border border-glass-border px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-signal hover:text-signal"
        >
          {content.contact.phone}
        </a>
        <a
          href={content.contact.linkedin}
          target="_blank"
          rel="noopener"
          className="rounded-lg border border-glass-border px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-signal hover:text-signal"
        >
          LinkedIn
        </a>
        <a
          href={content.contact.github}
          target="_blank"
          rel="noopener"
          className="rounded-lg border border-glass-border px-5 py-2.5 font-mono text-[13px] transition-colors hover:border-signal hover:text-signal"
        >
          GitHub
        </a>
      </motion.div>

      <ContactForm />

      <footer className="mt-10 border-t border-glass-border pt-8 font-mono text-[11.5px] text-paper-2">
        © {new Date().getFullYear()} {content.name} — Casablanca
      </footer>
    </section>
  )
}
