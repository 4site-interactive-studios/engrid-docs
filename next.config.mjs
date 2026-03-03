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
        source: '/docs/advanced-engrid-guide-index',
        destination: '/docs/v2/creating-an-engrid-theme',
        permanent: true,
      },
      {
        source: '/docs/before-you-begin',
        destination: '/docs/v2/en-account-buildout',
        permanent: true,
      },
      {
        source: '/docs/installation',
        destination: '/docs/v2/developing-with-engrid',
        permanent: true,
      },
      {
        source: '/docs/understanding-engrid-theme',
        destination: '/docs/v2/creating-an-engrid-theme',
        permanent: true,
      },
      {
        source: '/docs/developing-engrid',
        destination: '/docs/v2/developing-with-engrid',
        permanent: true,
      },
      {
        source: '/docs/example-pages',
        destination: '/docs/v2/engrid-page-template-example',
        permanent: true,
      },
      {
        source: '/docs/contributing-to-engrid',
        destination: '/docs/v2/contributing-to-engrid',
        permanent: true,
      },
      {
        source: '/docs/advanced-engrid-guide-index',
        destination: '/docs/v2/developing-with-engrid',
        permanent: true,
      },
      {
        source: '/docs/upsell-lightbox',
        destination: '/docs/v2/upsells',
        permanent: true,
      },
      {
        source: '/docs/embedd-engrid',
        destination: '/docs/v2/embedding-engrid',
        permanent: true,
      },
      {
        source: '/docs/donation-reciepting',
        destination: '/docs/v2/donation-receipting',
        permanent: true,
      },
      {
        source: '/docs/datalayer',
        destination: '/docs/v2/gtm-datalayer',
        permanent: true,
      },
      {
        source: '/docs/storage',
        destination: '/docs/v2/cookies',
        permanent: true,
      },
      {
        source: '/docs/engrid-pr',
        destination: '/docs/v2/upstream-pull-requests',
        permanent: true,
      },
      {
        source: '/docs/custom-lightboxes',
        destination: '/docs/v2/custom-lightboxes',
        permanent: true,
      },
      {
        source: '/docs/welcome-back',
        destination: '/docs/v2/welcome-back',
        permanent: true,
      },
      {
        source: '/docs/ecard-to-target',
        destination: '/docs/v2/advocacy-features#ecard-to-target',
        permanent: true,
      },
      {
        source: '/docs/embedded-ecard',
        destination: '/docs/v2/embedded-ecard',
        permanent: true,
      },
      {
        source: '/docs/feature-branch',
        destination: '/docs/v2/developing-with-engrid',
        permanent: true,
      },
      {
        source: '/docs/native-custom-ask-string',
        destination: '/docs/v2/gift-amount',
        permanent: true,
      },
      {
        source: '/docs/cheat-sheet',
        destination: '/docs/v2/conditional-content-helper-classes',
        permanent: true,
      },
      {
        source: '/docs/v2/ecard-to-target',
        destination: '/docs/v2/advocacy-features#ecard-to-target',
        permanent: true,
      },
      {
        source: '/docs/v2/conditionally-require-fields',
        destination: '/docs/v2/form-field-enhancements#input-required-visibility',
        permanent: true,
      },
      {
        source: '/docs/v2/in-memory-honor-helper-classes',
        destination: '/docs/v2/conditional-content-helper-classes#in-memorial-in-honor-giving',
        permanent: true,
      },
      {
        source: '/docs/v2/gift-frequency',
        destination: '/docs/v2/currency-donation-amounts#amount-helper-classes',
        permanent: true,
      },
      {
        source: '/docs/v2/payment-types',
        destination: '/docs/v2/payment-methods-digital-wallets#give-by-select',
        permanent: true,
      },
      {
        source: '/docs/v2/frequency-upsell',
        destination: '/docs/v2/upsells#donation-frequency-lightbox',
        permanent: true,
      },
      {
        source: '/docs/v2/form-field-helper-classes',
        destination: '/docs/v2/form-field-enchancements#helper-classes',
        permanent: true,
      },
      {
        source: '/docs/v2/dynamic-content-from-url-arguments',
        destination: '/docs/v2/data-and-url-parameters',
        permanent: true,
      },
            {
        source: '/component/a11y',
        destination: '/docs/v2/form-field-enhancements#accessibility-a11y',
        permanent: true,
      },
      {
        source: '/component/add-name-to-message',
        destination: '/docs/v2/advocacy-features#add-name-to-message',
        permanent: true,
      },
      {
        source: '/component/advocacy',
        destination: '/docs/v2/advocacy-features#advocacy',
        permanent: true,
      },
      {
        source: '/component/amount-label',
        destination: '/docs/v2/currency-donation-amounts#amount-label',
        permanent: true,
      },
      {
        source: '/component/apple-pay',
        destination: '/docs/v2/payment-methods-digital-wallets#apple-pay',
        permanent: true,
      },
      {
        source: '/component/auto-country-select',
        destination: '/docs/v2/auto-fill-smart-defaults#auto-country-select',
        permanent: true,
      },
      {
        source: '/component/auto-year',
        destination: '/docs/v2/auto-fill-smart-defaults#auto-year',
        permanent: true,
      },
      {
        source: '/component/autocomplete',
        destination: '/docs/v2/form-field-enhancements#autocomplete',
        permanent: true,
      },
      {
        source: '/component/autosubmit',
        destination: '/docs/v2/auto-fill-smart-defaults#autosubmit',
        permanent: true,
      },
      {
        source: '/component/brand-html',
        destination: '#',
        permanent: true,
      },
      {
        source: '/component/capitalize-fields',
        destination: '/docs/v2/form-field-enhancements#capitalize-fields',
        permanent: true,
      },
      {
        source: '/component/checkbox-label',
        destination: '/docs/v2/form-field-enhancements#checkbox-label',
        permanent: true,
      },
      {
        source: '/component/click-to-expand',
        destination: '/docs/v2/click-to-expand',
        permanent: true,
      },
      {
        source: '/component/cookie',
        destination: '/docs/v2/cookies#cookie-utilities',
        permanent: true,
      },
      {
        source: '/component/country-disable',
        destination: '/docs/v2/country-redirect-controls#country-disable',
        permanent: true,
      },
      {
        source: '/component/country-redirect',
        destination: '/docs/v2/country-redirect-controls#country-redirect',
        permanent: true,
      },
      {
        source: '/component/custom-currency',
        destination: '/docs/v2/currency-donation-amounts#custom-currency',
        permanent: true,
      },
      {
        source: '/component/custom-premium',
        destination: '/docs/v2/custom-premium',
        permanent: true,
      },
      {
        source: '/component/data-attributes',
        destination: '/docs/v2/data-and-url-parameters#data-attributes',
        permanent: true,
      },
      {
        source: '/component/data-hide',
        destination: '/docs/v2/data-and-url-parameters#data-hide',
        permanent: true,
      },
      {
        source: '/component/data-layer',
        destination: '/docs/v2/gtm-datalayer',
        permanent: true,
      },
      {
        source: '/component/data-replace',
        destination: '/docs/v2/data-and-url-parameters#data-replace',
        permanent: true,
      },
      {
        source: '/component/debug-hidden-fields',
        destination: '/docs/v2/debug-tools#debug-hidden-fields',
        permanent: true,
      },
      {
        source: '/component/debug-panel',
        destination: '/docs/v2/debug-tools#debug-panel',
        permanent: true,
      },
      {
        source: '/component/deprecated',
        destination: '/docs/v2/deprecated',
        permanent: true,
      },
      {
        source: '/component/digital-wallets',
        destination: '/docs/v2/payment-methods-digital-wallets#digital-wallets',
        permanent: true,
      },
      {
        source: '/component/ecard-to-target',
        destination: '/docs/v2/advocacy-features#ecard-to-target',
        permanent: true,
      },
      {
        source: '/component/embedded-ecard',
        destination: '/docs/v2/embedded-ecard',
        permanent: true,
      },
      {
        source: '/component/en-validators',
        destination: '/docs/v2/form-validation#en-custom-validators',
        permanent: true,
      },
      {
        source: '/component/engrid',
        destination: '/docs/v2/engrid-core-functions',
        permanent: true,
      },
      {
        source: '/component/event-tickets',
        destination: '/docs/v2/event-tickets',
        permanent: true,
      },
      {
        source: '/component/exit-intent-lightbox',
        destination: '/docs/v2/exit-intent-lightbox',
        permanent: true,
      },
      {
        source: '/component/expand-region-name',
        destination: '/docs/v2/expand-region-name',
        permanent: true,
      },
      {
        source: '/component/fast-form-fill',
        destination: '/docs/v2/remember-me',
        permanent: true,
      },
      {
        source: '/component/frequency-upsell-modal',
        destination: '/docs/v2/upsells#donation-frequency-lightbox',
        permanent: true,
      },
      {
        source: '/component/frequency-upsell',
        destination: '/docs/v2/upsells#donation-frequency-lightbox',
        permanent: true,
      },
      {
        source: '/component/fresh-address',
        destination: '/docs/v2/form-validation#fresh-address-email-validation',
        permanent: true,
      },
      {
        source: '/component/give-by-select',
        destination: '/docs/v2/payment-methods-digital-wallets#give-by-select',
        permanent: true,
      },
      {
        source: '/component/iframe',
        destination: '/docs/v2/embedding-engrid',
        permanent: true,
      },
      {
        source: '/component/input-has-value-and-focus',
        destination: '/docs/v2/form-field-enhancements#input-has-value-and-focus',
        permanent: true,
      },
      {
        source: '/component/input-placeholders',
        destination: '/docs/v2/form-field-enhancements#input-placeholders',
        permanent: true,
      },
      {
        source: '/component/live-currency',
        destination: '/docs/v2/currency-donation-amounts#live-currency',
        permanent: true,
      },
      {
        source: '/component/live-frequency',
        destination: '/docs/v2/currency-donation-amounts#live-frequency',
        permanent: true,
      },
      {
        source: '/component/live-variables',
        destination: '/docs/v2/live-variables',
        permanent: true,
      },
      {
        source: '/component/loader',
        destination: '/docs/v2/loader',
        permanent: true,
      },
      {
        source: '/component/logger',
        destination: '/docs/v2/debug-tools#logger',
        permanent: true,
      },
      {
        source: '/component/media-attribution',
        destination: '/docs/v2/media-attribution',
        permanent: true,
      },
      {
        source: '/component/min-max-amount',
        destination: '/docs/v2/currency-donation-amounts#min-max-amount',
        permanent: true,
      },
      {
        source: '/component/mobile-cta',
        destination: '/docs/v2/mobile-cta',
        permanent: true,
      },
      {
        source: '/component/modal',
        destination: '/docs/v2/custom-lightboxes',
        permanent: true,
      },
      {
        source: '/component/neverbounce',
        destination: '/docs/v2/form-validation#neverbounce-email-validation',
        permanent: true,
      },
      {
        source: '/component/optin-ladder',
        destination: '/docs/v2/opt-in-ladder',
        permanent: true,
      },
      {
        source: '/component/other-amount',
        destination: '/docs/v2/currency-donation-amounts#other-amount',
        permanent: true,
      },
      {
        source: '/component/page-background',
        destination: '/docs/v2/background-image-positioning',
        permanent: true,
      },
      {
        source: '/component/post-donation-embed',
        destination: '/docs/v2/post-donation-embed',
        permanent: true,
      },
      {
        source: '/component/postal-code-validator',
        destination: '/docs/v2/form-validation#us-postal-code-validator',
        permanent: true,
      },
      {
        source: '/component/preferred-payment-method',
        destination: '/docs/v2/preferred-payment-method',
        permanent: true,
      },
      {
        source: '/component/premium-gift',
        destination: '/docs/v2/custom-premium',
        permanent: true,
      },
      {
        source: '/component/progress-bar',
        destination: '/docs/v2/progress-bar',
        permanent: true,
      },
      {
        source: '/component/remember-me',
        destination: '/docs/v2/remember-me',
        permanent: true,
      },
      {
        source: '/component/required-if-visible',
        destination: '/docs/v2/form-field-enhancements#input-required-visibility',
        permanent: true,
      },
      {
        source: '/component/set-attr',
        destination: '/docs/v2/data-and-url-parameters#set-attribute',
        permanent: true,
      },
      {
        source: '/component/set-recurr-freq',
        destination: '/docs/v2/currency-donation-amounts#set-recurrence-frequency',
        permanent: true,
      },
      {
        source: '/component/show-hide-radio-checkboxes',
        destination: '/docs/v2/show-hide-radio-checkboxes',
        permanent: true,
      },
      {
        source: '/component/show-if-amount',
        destination: '/docs/v2/currency-donation-amounts#show-if-amount',
        permanent: true,
      },
      {
        source: '/component/show-if-present',
        destination:
          '/docs/v2/conditional-content-helper-classes#hide-show-based-on-presence-of-question',
        permanent: true,
      },
      {
        source: '/component/skip-link',
        destination: '/docs/v2/skip-link',
        permanent: true,
      },
      {
        source: '/component/src-defer',
        destination: '/docs/v2/deferred-asset-loading',
        permanent: true,
      },
      {
        source: '/component/stripe-financial-connections',
        destination: '/docs/v2/payment-security#stripe-financial-connections',
        permanent: true,
      },
      {
        source: '/component/supporter-hub',
        destination: '/docs/v2/supporter-hub',
        permanent: true,
      },
      {
        source: '/component/swap-amounts',
        destination: '/docs/v2/currency-donation-amounts#swap-amounts',
        permanent: true,
      },
      {
        source: '/component/thank-you-page-conditional-content',
        destination: '/docs/v2/show-hide-radio-checkboxes',
        permanent: true,
      },
      {
        source: '/component/ticker',
        destination: '/docs/v2/ticker',
        permanent: true,
      },
      {
        source: '/component/tidycontact',
        destination: '/docs/v2/tidycontact',
        permanent: true,
      },
      {
        source: '/component/translate-fields',
        destination: '/docs/v2/international-form-addresses',
        permanent: true,
      },
      {
        source: '/component/universal-opt-in',
        destination: '/docs/v2/form-field-enhancements#universal-opt-in',
        permanent: true,
      },
      {
        source: '/component/upsell-checkbox',
        destination: '/docs/v2/upsells#donation-upsell-checkbox',
        permanent: true,
      },
      {
        source: '/component/upsell-lightbox',
        destination: '/docs/v2/upsells#donation-upsell-lightbox',
        permanent: true,
      },
      {
        source: '/component/url-params-to-body-attrs',
        destination: '/docs/v2/data-and-url-parameters#url-parameters-to-body-attributes',
        permanent: true,
      },
      {
        source: '/component/url-to-form',
        destination: '/docs/v2/data-and-url-parameters#url-to-form',
        permanent: true,
      },
      {
        source: '/component/us-only-form',
        destination: '/docs/v2/country-redirect-controls#us-only-form',
        permanent: true,
      },
      {
        source: '/component/version',
        destination: '/docs/v2/version',
        permanent: true,
      },
      {
        source: '/component/vgs',
        destination: '/docs/v2/payment-security#vgs-very-good-security',
        permanent: true,
      },
      {
        source: '/component/welcome-back',
        destination: '/docs/v2/welcome-back',
        permanent: true,
      },
    ]
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig)
)
