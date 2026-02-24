import { Metadata } from 'next'

export const siteConfig = {
  name: 'Arzi Anime List',
  description: 'Discover and explore thousands of anime with Arzi Anime List. Browse currently airing shows, completed series, and find your next favorite anime with detailed information, ratings, and reviews.',
  url: 'https://arzianime.list',
  author: 'Arzi',
  creator: 'Arzi',
  github: 'https://github.com/ArziTech',
  links: {
    github: 'https://github.com/ArziTech/arzi-anime-list',
  },
  keywords: [
    'anime',
    'anime list',
    'anime database',
    'myanimelist',
    'anime search',
    'currently airing anime',
    'anime recommendations',
    'anime ratings',
    'anime reviews',
    'jikan api',
  ],
}

export type SiteConfig = typeof siteConfig

interface PageMetadataOptions {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  image,
  keywords,
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name
  const pageDescription = description || siteConfig.description
  const pageKeywords = keywords || siteConfig.keywords

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: siteConfig.author, url: siteConfig.links.github }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: pageTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: image ? [image] : [],
      creator: '@ArziTech',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: siteConfig.url,
    },
  }
}
