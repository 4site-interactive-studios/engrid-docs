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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      ;(config.resolve.fallback.fs = false),
        (config.resolve.fallback.path = false)
    }

    return config
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
)
