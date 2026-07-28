import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, LocalizedText } from '../data/content'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: LocalizedText) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr')
  const t = (text: LocalizedText) => text[lang]

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return ctx
}

export function Html({ text }: { text: LocalizedText }) {
  const { t } = useLang()
  return <span dangerouslySetInnerHTML={{ __html: t(text) }} />
}
