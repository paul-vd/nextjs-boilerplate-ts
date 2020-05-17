import { defaultLocale } from './config'
import { Locale, isLocale } from './types'
import Cookies from 'js-cookie'
import { DocumentContext } from 'next/document'
import { NextPageContext } from 'next'
import cookies from 'next-cookies'
import parser from 'accept-language-parser'

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

export function getApiLocale(ctx: DocumentContext | NextPageContext) {
  if (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang)) {
    const cookieLocale = cookies(ctx).locale
    if (cookieLocale && isLocale(cookieLocale)) {
      return cookieLocale
    } else {
      const acceptLanguage = ctx.req?.headers['accept-language']
      if (acceptLanguage) {
        const languages = parser.parse(acceptLanguage)
        let userLocale: Locale | undefined = undefined
        for (const lang of languages) {
          if (isLocale(lang.code)) {
            userLocale = lang.code
            break
          }
        }
        if (userLocale) {
          return userLocale
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    }
  } else {
    return ctx.query.lang
  }
}
