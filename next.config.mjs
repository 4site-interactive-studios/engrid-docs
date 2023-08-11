import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  preferRelative: true,
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config, { nextRuntime }) => {
    if (typeof nextRuntime === 'undefined') {
      const { IgnorePlugin } = require('webpack')
      const ignoreFs = new IgnorePlugin({ resourceRegExp: /fs/ })
      config.plugins.push(ignoreFs)
    }

    return config
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
)
