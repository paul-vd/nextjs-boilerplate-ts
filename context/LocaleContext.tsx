import React from 'react'
import Router, { useRouter } from 'next/router'
import { Locale, isLocale } from 'src/translations/types'
import Cookies from 'js-cookie'

interface ContextProps {
  readonly locale: Locale
  readonly setLocale: (locale: Locale) => void
}

export const LocaleContext = React.createContext<ContextProps>({
  locale: 'en',
  setLocale: () => null,
})

export const LocaleProvider: React.FC<{ lang: Locale }> = ({ lang, children }) => {
  const [locale, setLocale] = React.useState(lang)
  const [force, setForce] = React.useState(false)
  const { query } = useRouter()

  React.useEffect(() => {
    const abortController = new AbortController()
    const setDocumentLocale = () => {
      if (process.browser && document && !abortController.signal.aborted) {
        const docHtml = document.getElementsByTagName('html')
        if (docHtml && docHtml[0]) docHtml[0].lang = locale
      }
    }
    if (locale !== Cookies.get('locale')) {
      Cookies.set('locale', locale)
    }
    setDocumentLocale()
    return () => {
      abortController.abort()
    }
  }, [locale])

  React.useEffect(() => {
    if (typeof query.lang === 'string' && isLocale(query.lang) && locale !== query.lang && !force) {
      setLocale(query.lang)
    } else if (force) setForce(false)
  }, [query.lang, locale])

  const handleSetLocale = (lang: Locale) => {
    if (typeof query.lang === 'string' && isLocale(query.lang)) {
      setForce(true)
      Router.push(`/?lang=${lang}`, undefined, { shallow: true })
    }
    setLocale(lang)
  }

  return <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>{children}</LocaleContext.Provider>
}
