import { createContext, useContext, useEffect, useMemo } from 'react'
import { translations } from '../i18n/translations.js'
import { getByPath, interpolate, pickLocale } from '../i18n/localize.js'

const LocaleContext = createContext(null)
const DEFAULT_LOCALE = 'en'

export function LocaleProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = DEFAULT_LOCALE
  }, [])

  const value = useMemo(() => {
    const locale = DEFAULT_LOCALE
    const messages = translations[locale] || translations.en
    const t = (key, vars) => {
      const found =
        getByPath(messages, key) ?? getByPath(translations.en, key) ?? key
      return typeof found === 'string' ? interpolate(found, vars) : found
    }

    return {
      locale,
      setLocale: () => {},
      t,
      messages,
      pick: (entry) => pickLocale(entry, locale),
    }
  }, [])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

function useLocaleContext() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}

export function useLocale() {
  return useLocaleContext().locale
}

export function useSetLocale() {
  return useLocaleContext().setLocale
}

export function useTranslation() {
  const { t, locale, messages, pick } = useLocaleContext()
  return { t, locale, messages, pick }
}
