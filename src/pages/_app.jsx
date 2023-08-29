import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:site" content="@4SiteStudios" />
        <meta name="twitter:creator" content="@4SiteStudios" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="4Site ENgrid" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="" />

        <meta
          name="st:title"
          content="ENgrid - Engaging Networks Template Framework"
        />
        <meta
          name="twitter:title"
          content="ENgrid - Engaging Networks Template Framework"
        />
        <meta
          name="twitter:image"
          content="https://use.sharethumb.io/og/engrid.4sitestudios.com"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:title"
          content="ENgrid - Engaging Networks Template Framework"
        />
        <meta
          property="og:image"
          content="https://use.sharethumb.io/og/engrid.4sitestudios.com"
        />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:width" content="1200" />
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Layout
        title={title}
        tableOfContents={tableOfContents}
        isMarkdoc={Boolean(pageProps.markdoc)}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
