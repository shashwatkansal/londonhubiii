import { Metadata } from 'next';
import { HUB_CONFIG } from '@/lib/settings';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  keywords?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  image = '/assets/images/hub3photo.jpg',
  url,
  type = 'website',
  author,
  publishedTime,
  keywords = [],
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  const siteName = `${HUB_CONFIG.HUB_NAME} - Global Shapers ${HUB_CONFIG.CITY_NAME}`;
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = `${HUB_CONFIG.HUB_NAME} is the ${HUB_CONFIG.CITY_NAME} hub of the Global Shapers Community, a network of young people driving positive change in their communities.`;
  const finalDescription = description || defaultDescription;

  const defaultKeywords = [
    'Global Shapers',
    HUB_CONFIG.CITY_NAME,
    HUB_CONFIG.HUB_NAME,
    'World Economic Forum',
    'Youth Leadership',
    'Social Impact',
    'Community Development',
    'Sustainability',
    'Innovation',
  ];

  return {
    metadataBase: new URL(baseUrl),
    title: fullTitle,
    description: finalDescription,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    authors: author ? [{ name: author }] : [{ name: HUB_CONFIG.HUB_NAME }],
    creator: HUB_CONFIG.HUB_NAME,
    publisher: HUB_CONFIG.HUB_NAME,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      siteName,
      title: fullTitle,
      description: finalDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        authors: author ? [author] : [],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: HUB_CONFIG.TWITTER_HANDLE || '@globalshapers',
      creator: HUB_CONFIG.TWITTER_HANDLE || '@globalshapers',
      title: fullTitle,
      description: finalDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
    icons: {
      icon: [
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon/safari-pinned-tab.svg',
          color: '#003C71',
        },
      ],
    },
    manifest: '/favicon/site.webmanifest',
    other: {
      'msapplication-TileColor': '#003C71',
      'msapplication-config': '/favicon/browserconfig.xml',
      'theme-color': '#003C71',
    },
  };
}

export function generateStructuredData({
  type = 'Organization',
  name = HUB_CONFIG.HUB_NAME,
  description,
  url,
  image,
  author,
  datePublished,
  dateModified,
}: {
  type?: 'Organization' | 'Article' | 'Event';
  name?: string;
  description?: string;
  url?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
} = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
  
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name,
        url: baseUrl,
        logo: `${baseUrl}/assets/images/gs_white_logo.png`,
        description: description || `${name} - Global Shapers ${HUB_CONFIG.CITY_NAME} Hub`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: HUB_CONFIG.CITY_NAME,
          addressCountry: HUB_CONFIG.COUNTRY || '',
        },
        sameAs: [
          HUB_CONFIG.LINKEDIN_URL,
          HUB_CONFIG.INSTAGRAM_URL,
          HUB_CONFIG.TWITTER_URL,
        ].filter(Boolean),
        memberOf: {
          '@type': 'Organization',
          name: 'Global Shapers Community',
          url: 'https://www.globalshapers.org',
        },
      };

    case 'Article':
      return {
        ...baseSchema,
        headline: name,
        description,
        image: image ? `${baseUrl}${image}` : undefined,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Person',
          name: author || HUB_CONFIG.HUB_NAME,
        },
        publisher: {
          '@type': 'Organization',
          name: HUB_CONFIG.HUB_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/assets/images/gs_white_logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url ? `${baseUrl}${url}` : baseUrl,
        },
      };

    case 'Event':
      return {
        ...baseSchema,
        name,
        description,
        startDate: datePublished,
        endDate: dateModified,
        location: {
          '@type': 'Place',
          name: HUB_CONFIG.CITY_NAME,
          address: {
            '@type': 'PostalAddress',
            addressLocality: HUB_CONFIG.CITY_NAME,
            addressCountry: HUB_CONFIG.COUNTRY || '',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: HUB_CONFIG.HUB_NAME,
          url: baseUrl,
        },
        image: image ? `${baseUrl}${image}` : undefined,
      };

    default:
      return baseSchema;
  }
}