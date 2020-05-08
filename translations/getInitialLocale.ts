import { defaultLocale } from './config'
import { Locale, isLocale } from './types'
import Cookies from 'js-cookie'

export function getInitialLocale(): Locale {
  const localSetting = Cookies.get('locale')

  if (localSetting && isLocale(localSetting)) {
    return localSetting
  }

  if (process.browser && navigator) {
    const [browserSetting] = navigator.language.split('-')
    if (isLocale(browserSetting)) {
      return browserSetting
    }
  }

  return defaultLocale
}
