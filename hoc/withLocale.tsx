import React from 'react'
import { NextPage } from 'next'
import Error from 'next/error'
import { getDisplayName } from 'next/dist/next-server/lib/utils'
import { isLocale, Locale } from '../translations/types'
import { LocaleProvider } from '../context/LocaleContext'
import { getInitialLocale } from 'src/translations/getLocale'
import cookies from 'next-cookies'

interface LangProps {
  localeQuery?: Locale
}

export default (WrappedPage: NextPage<any>) => {
  const WithLocale: NextPage<any, LangProps> = ({ localeQuery, ...pageProps }) => {
    const locale = localeQuery || getInitialLocale()

    if (!locale) {
      return <Error statusCode={404} />
    }
    return (
      <LocaleProvider lang={locale}>
        <WrappedPage {...pageProps} />
      </LocaleProvider>
    )
  }

  WithLocale.getInitialProps = async (ctx) => {
    let pageProps = {}
    if (WrappedPage.getInitialProps) {
      pageProps = await WrappedPage.getInitialProps(ctx)
    }

    if (typeof ctx.query.lang !== 'string' || !isLocale(ctx.query.lang)) {
      const { locale } = cookies(ctx)

      return { ...pageProps, localeQuery: locale && isLocale(locale) ? locale : undefined }
    }
    return { ...pageProps, localeQuery: ctx.query.lang }
  }

  WithLocale.displayName = `withLang(${getDisplayName(WrappedPage)})`

  return WithLocale
}
