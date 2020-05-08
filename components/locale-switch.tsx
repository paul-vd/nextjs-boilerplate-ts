import React from 'react'
import { useRouter } from 'next/router'
import { locales, languageNames } from '../translations/config'
import { LocaleContext } from '../context/LocaleContext'

import { Locale } from 'src/translations/types'

const LocaleSwitcher: React.FC = () => {
  const router = useRouter()
  const { locale, setLocale } = React.useContext(LocaleContext)

  const handleLocaleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLocale(e.target.value as Locale)
    },
    [router]
  )

  return (
    <select value={locale} onChange={handleLocaleChange}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames[locale]}
        </option>
      ))}
    </select>
  )
}

export default LocaleSwitcher
