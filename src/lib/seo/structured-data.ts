import { SiteConfig } from './metadata'

export function generateWebSiteJsonLd(siteConfig: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
      url: siteConfig.links.github,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  }
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateAnimeJsonLd(anime: {
  name: string
  description: string
  image: string
  datePublished?: string
  rating?: number
  genres?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: anime.name,
    description: anime.description,
    image: anime.image,
    datePublished: anime.datePublished,
    aggregateRating: anime.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: anime.rating,
          bestRating: 10,
          worstRating: 1,
        }
      : undefined,
    genre: anime.genres,
  }
}
