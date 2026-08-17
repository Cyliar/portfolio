import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Lang, LocalizedText } from '../data/content'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: LocalizedText) => string
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'portfolio-lang'

/**
 * Choix précédent de la visiteuse ou du visiteur s'il existe, français sinon.
 * La langue du navigateur est volontairement ignorée : le site doit s'ouvrir en
 * français de façon prévisible, la bascule reste à un clic.
 */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    // Stockage inaccessible : on retombe sur le français.
  }

  return 'fr'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Stockage indisponible (navigation privée) : le choix reste valable
      // pour la session en cours, ce qui suffit.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: (text: LocalizedText) => text[lang] }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) {
    throw new Error('useLang must be used within a LangProvider')
  }
  return ctx
}

/** Injecte un texte traduit contenant du HTML inline (`<em>`, `<b>`). */
export function Html({ text, className }: { text: LocalizedText; className?: string }) {
  const { t } = useLang()
  return <span className={className} dangerouslySetInnerHTML={{ __html: t(text) }} />
}
