import React, { ReactNode } from 'react'
import Head from 'next/head'
import config from 'src/utils/config'

interface SeoHead {
  children?: ReactNode
  title?: string
  description?: string
  locale?: string
}

const defaultTitle = config.siteName
const defaultDescription =
  'This boilerplate makes it easier to get up and running with a well-structured Next.js and TypeScript application.'
const defaultLocale = 'en-GB'

export default function SeoHead({ children, title = defaultTitle, description = defaultDescription, locale = defaultLocale }: SeoHead) {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:locale" content={locale} />
      {children && children}
    </Head>
  )
}
