import { useRouter } from 'next/router'
import Popper from 'popper.js'
import React from 'react'
import { Locale } from 'src/translations/types'
import useTranslation from 'src/utils/useTranslations'
import { LocaleContext } from '../context/LocaleContext'
import { languageNames, locales } from '../translations/config'
import cn from 'src/utils/classnames'

const LocaleSwitcher: React.FC<{}> = () => {
  const router = useRouter()
  const { locale, setLocale } = React.useContext(LocaleContext)
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const btnDropdownRef = React.createRef<HTMLButtonElement>()
  const popoverDropdownRef = React.createRef<HTMLDivElement>()
  const { t } = useTranslation()

  const openDropdownPopover = () => {
    if (btnDropdownRef.current && popoverDropdownRef.current) {
      new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: 'top-end',
      })
      setDropdownPopoverShow(true)
      document.body.addEventListener('click', () => setDropdownPopoverShow(false))
    }
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
  }

  const handleLocaleChange = React.useCallback(
    (locale: Locale) => {
      setLocale(locale)
      closeDropdownPopover()
    },
    [router]
  )

  return (
    <>
      <button
        className="h-8 px-6 py-3 text-sm font-bold text-white uppercase bg-center bg-cover rounded shadow outline-none focus:outline-none focus:shadow-none"
        style={{ transition: 'all .15s ease', backgroundImage: `url(/flags/${locale}.svg)` }}
        type="button"
        ref={btnDropdownRef}
        area-label={t('switch-language')}
        onClick={() => {
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()
        }}
      />
      <div
        ref={popoverDropdownRef}
        className={cn('text-base z-50  text-left rounded shadow-lg mb-1 bg-white overflow-hidden', {
          block: dropdownPopoverShow,
          hidden: !dropdownPopoverShow,
        })}
      >
        {locales.map((locale) => (
          <button
            key={locale}
            className="flex items-center px-4 py-2 text-sm font-normal text-gray-800 bg-white locale-dropdown-button hover:bg-primary hover:text-white"
            onClick={() => handleLocaleChange(locale)}
            area-label={languageNames[locale]}
          >
            <img src={`/flags/${locale}.svg`} width={30} height={30} className="mr-2" alt={languageNames[locale]} />
            {languageNames[locale]}
          </button>
        ))}
      </div>
      <style jsx>{`
        .locale-dropdown-button {
          min-width: 127px;
        }
      `}</style>
    </>
  )
}

export default LocaleSwitcher
