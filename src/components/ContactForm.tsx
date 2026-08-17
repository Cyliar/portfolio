import { useState, type FormEvent } from 'react'
import { content } from '../data/content'
import { useLang } from '../i18n/useLang'

/**
 * Identifiant de formulaire Formspree. Renseigné, les messages arrivent
 * directement dans la boîte mail. Laissé vide, le formulaire retombe sur un
 * `mailto` pré-rempli, ce qui fonctionne sans aucun compte.
 */
const FORMSPREE_ID = ''

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-text placeholder:text-muted-2 outline-none transition-colors focus:border-violet'

export default function ContactForm() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  function openMailto() {
    const subject = t({ fr: 'Message depuis le portfolio', en: 'Message from the portfolio' })
    const body = [
      `${t({ fr: 'Nom', en: 'Name' })}: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!FORMSPREE_ID) {
      openMailto()
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) throw new Error(`Formspree a répondu ${response.status}`)

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      // L'envoi a échoué : on garde la saisie et on propose le repli mail.
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass rounded-2xl p-6 text-sm text-muted">
        <p className="font-display text-lg text-text">
          {t({ fr: 'Message envoyé, merci !', en: 'Message sent, thank you!' })}
        </p>
        <p className="mt-2">
          {t({
            fr: 'Je réponds généralement dans la journée.',
            en: 'I usually reply within the day.',
          })}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{t({ fr: 'Ton nom', en: 'Your name' })}</span>
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t({ fr: 'Ton nom', en: 'Your name' })}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="sr-only">{t({ fr: 'Ton email', en: 'Your email' })}</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t({ fr: 'Ton email', en: 'Your email' })}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">{t({ fr: 'Ton message', en: 'Your message' })}</span>
        <textarea
          required
          rows={5}
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={t({ fr: 'Ton message', en: 'Your message' })}
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === 'sending'
            ? t({ fr: 'Envoi…', en: 'Sending…' })
            : t({ fr: 'Envoyer le message', en: 'Send message' })}
        </button>

        {status === 'error' && (
          <p role="alert" className="text-[13px] text-magenta">
            {t({
              fr: "L'envoi a échoué. ",
              en: 'Sending failed. ',
            })}
            <button type="button" onClick={openMailto} className="underline hover:text-text">
              {t({ fr: 'Envoyer par mail', en: 'Send by email' })}
            </button>
          </p>
        )}
      </div>
    </form>
  )
}
