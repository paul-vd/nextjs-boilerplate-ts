import tailwindConfig from '../tailwind.config.js'
import tailwindTheme from './tailwind'

export function domainPrefix(suffix: string) {
  return `${config.domain}/${suffix}`
}

const config = {
  siteName: 'Nextjs Boilerplate (ts, tailwind, sitemap, emotion.js)',
  domain: process.env.DOMAIN,
  theme: {
    screens: {
      ...tailwindTheme.screens,
    },
    ...tailwindConfig.theme,
  },
  social: {
    facebook: 'https://facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://instagram.com/',
    github: 'https://github.com/',
  },
}
export default config
