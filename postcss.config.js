// const tailwindcss = require("tailwindcss")("./tailwind.config.js");

module.exports = {
  plugins: [
    [
      "tailwindcss",
      {
        config: {},
      },
    ],
    "autoprefixer",
    "cssnano",
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./src/pages/**/*.{js,jsx,ts,tsx}",
                "./src/components/**/*.{js,jsx,ts,tsx}",
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          ],
        ]
      : []),
    "postcss-preset-env",
  ],
};
