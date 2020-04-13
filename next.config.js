const chalk = require("chalk");
const path = require("path");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const webpack = (config) => {
  config.resolve.alias["src"] = path.join(__dirname, "./src/"); //absolute imports
  config.resolve.alias["public"] = path.join(__dirname, "./public/"); //absolute imports
  return config;
};

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER; // when `next dev` or `yarn dev` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && !process.env.STAGING; // when `next build` or `yarn build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && !!process.env.STAGING; // when `STAGING=true next build` or `STAGING=true yarn build` is used
  console.log(
    chalk.blueBright(
      `isDev:(${chalk.red(isDev)}), isProd:(${chalk.red(
        isProd
      )}), isStaging:(${chalk.red(isStaging)})`
    )
  );
  const env = {
    ENV_DEV: isDev,
    ENV_PROD: isProd,
    ENV_STAGING: isStaging,
  };

  // next.config.js object
  return {
    env,
    webpack,
  };
};
