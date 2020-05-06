import { AppProps } from 'next/app'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import 'src/styles/index.css'
import ScreenSize from 'src/components/screen-size'
import config, { domainPrefix } from 'src/utils/config'
import Head from 'next/head'

const isDev = process.env.NODE_ENV === 'development'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content={config.theme.colors.primary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content={config.theme.colors.secondary} />
        {/*
        <meta name="msapplication-TileImage" content="/mstile-144x144.png"></meta> 
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> 
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color={config.theme.colors.secondary} /> 
        <link rel="manifest" href="/site.webmanifest" />  
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        */}
        <link rel="icon" href="/favicon.ico" />
        <LogoJsonLd logo={domainPrefix('/icon.svg')} url={config.domain} />
        <SocialProfileJsonLd
          type="Person"
          name={config.siteName}
          url={config.domain}
          sameAs={[config.social.twitter, config.social.facebook, config.social.instagram]}
        />
      </Head>
      <Component {...pageProps} />
      {isDev && <ScreenSize />}
    </>
  )
}

export default MyApp
