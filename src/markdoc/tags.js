import { Callout } from '@/components/Callout'
import { Button } from '@/components/Button'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  Button: {
    attributes: {
      href: { type: String, required: true },
      variant: {
        type: String,
        default: 'primary',
        matches: ['primary', 'secondary', 'tertiary'],
        errorLevel: 'critical',
      },
      size: {
        type: String,
        default: 'md',
        matches: ['sm', 'md', 'lg'],
        errorLevel: 'critical',
      },
      target: { type: String, default: '_self' },
      rel: { type: String, default: undefined },
    },
    render: Button,
  },
  // Lowercase alias to allow {% button %} in Markdown
  button: {
    attributes: {
      href: { type: String, required: true },
      variant: {
        type: String,
        default: 'primary',
        matches: ['primary', 'secondary', 'tertiary'],
        errorLevel: 'critical',
      },
      size: {
        type: String,
        default: 'md',
        matches: ['sm', 'md', 'lg'],
        errorLevel: 'critical',
      },
      target: { type: String, default: '_self' },
      rel: { type: String, default: undefined },
    },
    render: Button,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
}

export default tags
