const chalk = require('chalk')
const path = require('path')
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

const webpack = (config) => {
  config.resolve.alias['src'] = path.join(__dirname, './') //absolute imports
  return config
}

let initial = true

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER // when `next dev` or `yarn dev` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && !process.env.STAGING // when `next build` or `yarn build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && !!process.env.STAGING // when `STAGING=true next build` or `STAGING=true yarn build` is used
  const domain = isDev ? 'http://localhost:3000' : 'https://yoururl.com' // used og: url prefixing at build time
  if (initial) {
    const env = isStaging ? 'staging' : process.env.NODE_ENV
    console.log(chalk.white(`[ ${chalk.keyword('orange')('dom')}  ]  ${domain}`))
    console.log(chalk.white(`[ ${chalk.keyword('orange')('env')}  ]  ${env}`))
    initial = false
  }
  const env = {
    ENV_DEV: isDev,
    ENV_PROD: isProd,
    ENV_STAGING: isStaging,
    DOMAIN: domain,
  }
  // next.config.js object
  return {
    env,
    webpack,
    ...(isDev
      ? {
          experimental: {
            reactRefresh: true,
          },
        }
      : {}),
  }
}
