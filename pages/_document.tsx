import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { defaultLocale } from 'src/translations/config'
import { Locale } from 'src/translations/types'
import { getApiLocale } from 'src/translations/getLocale'
export default class MyDocument extends Document<{ locale?: Locale }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, locale: getApiLocale(ctx) }
  }
  render() {
    const { locale } = this.props

    return (
      <Html lang={locale || defaultLocale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
