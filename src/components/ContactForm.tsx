import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

export default function ContactForm() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const subject = t({ fr: 'Message depuis le portfolio', en: 'Message from the portfolio' })
    const body = `${t({ fr: 'Nom', en: 'Name' })}: ${name}\n${t({ fr: 'Email', en: 'Email' })}: ${email}\n\n${message}`
    window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mt-8 grid max-w-[520px] gap-3.5"
    >
      <div className="grid gap-3.5 sm:grid-cols-2">
        <input
          required
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t({ fr: 'Ton nom', en: 'Your name' })}
          className="rounded-lg border border-glass-border bg-glass px-4 py-2.5 text-sm text-paper placeholder:text-paper-2 outline-none transition-colors focus:border-signal"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t({ fr: 'Ton email', en: 'Your email' })}
          className="rounded-lg border border-glass-border bg-glass px-4 py-2.5 text-sm text-paper placeholder:text-paper-2 outline-none transition-colors focus:border-signal"
        />
      </div>
      <textarea
        required
        rows={4}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={t({ fr: 'Ton message', en: 'Your message' })}
        className="resize-none rounded-lg border border-glass-border bg-glass px-4 py-2.5 text-sm text-paper placeholder:text-paper-2 outline-none transition-colors focus:border-signal"
      />
      <button
        type="submit"
        className="w-max rounded-lg border border-signal bg-signal px-5 py-2.5 font-mono text-[13px] text-white transition-colors hover:bg-[#6a4ee0]"
      >
        {t({ fr: 'Envoyer', en: 'Send' })}
      </button>
    </motion.form>
  )
}
