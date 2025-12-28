// app/components/seo/SEOHead.tsx
import { Metadata } from 'next'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-default.png',
  noindex = false
}: SEOHeadProps): Metadata {
  const siteName = 'Fluentools'
  const fullTitle = `${title} | ${siteName}`
  const baseUrl = 'https://fluentools.com'
  const fullCanonical = canonical || baseUrl

  return {
    title: fullTitle,
    description: description,
    keywords: keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    
    alternates: {
      canonical: fullCanonical,
    },

    openGraph: {
      title: fullTitle,
      description: description,
      url: fullCanonical,
      siteName: siteName,
      images: [
        {
          url: `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [`${baseUrl}${ogImage}`],
      creator: '@fluentools',
    },

    verification: {
      google: 'your-google-verification-code', // เปลี่ยนหลังได้ verification code
    },

    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
    },
  }
}

// Schema.org structured data
export function generateStructuredData(type: 'Calculator' | 'Converter' | 'Generator', data: {
  name: string
  description: string
  url: string
  keywords?: string[]
}) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: type,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Fluentools',
      url: 'https://fluentools.com',
    },
  }

  if (data.keywords) {
    return {
      ...baseSchema,
      keywords: data.keywords.join(', '),
    }
  }

  return baseSchema
}

// Breadcrumb structured data
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

// FAQ structured data
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}