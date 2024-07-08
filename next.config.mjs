import withMarkdoc from '@markdoc/next.js'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: "/docs/advanced-engrid-guide-index",
        destination: "/docs/v2/creating-an-engrid-theme",
        permanent: true,
      },
      {
        source: '/docs/before-you-begin',
        destination: "/docs/v2/en-account-buildout",
        permanent: true,
      },
      {
        source: '/docs/installation',
        destination: "/docs/v2/developing-with-engrid",
        permanent: true,
      },
      {
        source: '/docs/understanding-engrid-theme',
        destination: "/docs/v2/creating-an-engrid-theme",
        permanent: true,
      },
      {
        source: '/docs/developing-engrid',
        destination: "/docs/v2/developing-with-engrid",
        permanent: true,
      },
      {
        source: '/docs/example-pages',
        destination: "/docs/v2/engrid-page-template-example",
        permanent: true,
      },
      {
        source: '/docs/contributing-to-engrid-scripts',
        destination: "/docs/v2/contributing-to-engrid-scripts",
        permanent: true,
      },
      {
        source: "/docs/advanced-engrid-guide-index",
        destination: "/docs/v2/developing-with-engrid",
        permanent: true,
      },
      {
        source: '/docs/upsell-lightbox',
        destination: "/docs/v2/upsells",
        permanent: true,
      },
      {
        source: '/docs/embedd-engrid',
        destination: "/docs/v2/embedding-engrid",
        permanent: true,
      },
      {
        source: '/docs/donation-reciepting',
        destination: "/docs/v2/donation-receipting",
        permanent: true,
      },
      {
        source: '/docs/datalayer',
        destination: "/docs/v2/gtm-datalayer",
        permanent: true,
      },
      {
        source: '/docs/storage',
        destination: "/docs/v2/cookies",
        permanent: true,
      },
      {
        source: '/docs/engrid-scripts-pr',
        destination: "/docs/v2/upstream-pull-requests",
        permanent: true,
      },
      {
        source: '/docs/custom-lightboxes',
        destination: "/docs/v2/custom-lightboxes",
        permanent: true,
      },
      {
        source: '/docs/welcome-back',
        destination: "/docs/v2/welcome-back",
        permanent: true,
      },
      {
        source: '/docs/ecard-to-target',
        destination: "/docs/v2/ecard-to-target",
        permanent: true,
      },
      {
        source: '/docs/embedded-ecard',
        destination: "/docs/v2/embedded-ecard",
        permanent: true,
      },
      {
        source: '/docs/feature-branch',
        destination: "/docs/v2/developing-with-engrid",
        permanent: true,
      },
      {
        source: '/docs/native-custom-ask-string',
        destination: "/docs/v2/gift-amount",
        permanent: true,
      },
      {
        source: "/docs/cheat-sheet",
        destination: "/docs/v2/conditional-content-helper-classes",
        permanent: true,
      },
    ]
  }
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
)
