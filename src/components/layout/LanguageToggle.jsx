import { useSetLocale, useLocale, useTranslation } from '../../contexts/LocaleContext.jsx'

export default function LanguageToggle() {
  const locale = useLocale()
  const setLocale = useSetLocale()
  const { t } = useTranslation()

  return (
    <div className="language-toggle" aria-label={t('common.languageSwitcher')}>
      <button
        type="button"
        data-language="ko"
        className={locale === 'ko' ? 'is-active' : undefined}
        onClick={() => setLocale('ko')}
        aria-pressed={locale === 'ko'}
      >
        KO
      </button>
      <button
        type="button"
        data-language="en"
        className={locale === 'en' ? 'is-active' : undefined}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  )
}
