import Head from 'next/head'
import LocaleSwitcher from 'src/components/locale-switch'
import withLocale from 'src/hoc/withLocale'
import config from 'src/utils/config'
import useTranslation from 'src/utils/useTranslations'
import { useContext } from 'react'
import { LocaleContext } from 'src/context/LocaleContext'

const Home = () => {
  const { locale } = useContext(LocaleContext)
  const { t } = useTranslation()

  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App - {locale}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title" dangerouslySetInnerHTML={{ __html: t('title') }} />

        <p className="description" dangerouslySetInnerHTML={{ __html: t('description') }} />

        <div className="flex flex-wrap w-full mt-16">
          <a href="https://nextjs.org/docs" className="card">
            <h3>{t('documentation.title')} &rarr;</h3>
            <p>{t('documentation.description')}</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>{t('learn.title')} &rarr;</h3>
            <p>{t('learn.description')}</p>
          </a>

          <a href="https://github.com/zeit/next.js/tree/master/examples" className="card">
            <h3>{t('examples.title')} &rarr;</h3>
            <p>{t('examples.description')}</p>
          </a>

          <a
            href="https://zeit.co/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>{t('deploy.title')} &rarr;</h3>
            <p>{t('deploy.description')}</p>
          </a>
        </div>
      </main>

      <footer className="flex-wrap">
        <a
          href="https://vercel.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('powered-by')} <img src="/vercel.svg" alt="Vercel Logo" />
        </a>
        <div className="w-full text-center">
          <LocaleSwitcher />
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: ${config.theme.screens.md}) {
          .card {
            flex-basis: 100%;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default withLocale(Home)
