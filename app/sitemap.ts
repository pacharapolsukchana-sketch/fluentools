import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fluentools.com'
  const currentDate = new Date()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Finance calculators
  const financeCalculators = [
    'mortgage',    // High priority
    'loan',        // High priority
    'tip',
    'discount',
  ].map((slug) => ({
    url: `${baseUrl}/finance/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: slug === 'mortgage' || slug === 'loan' ? 0.9 : 0.8,
  }))

  // Health calculators
  const healthCalculators = [
    'bmi',        // High priority
    'calorie',    // High priority
    'age',
    'pregnancy',
    'period',
  ].map((slug) => ({
    url: `${baseUrl}/health/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: slug === 'bmi' || slug === 'calorie' ? 0.9 : 0.7,
  }))

  // Converters
  const converters = [
    'currency',     // High priority
    'temperature',
    'weight',
    'length',
  ].map((slug) => ({
    url: `${baseUrl}/converters/${slug}`,
    lastModified: currentDate,
    changeFrequency: slug === 'currency' ? 'daily' as const : 'weekly' as const,
    priority: slug === 'currency' ? 0.9 : 0.7,
  }))

  // Basic calculators
  const calculators = [
    'percentage',
    'ratio',
  ].map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Business calculators
  const businessCalculators = [
    'salary',
    'tax',
  ].map((slug) => ({
    url: `${baseUrl}/business/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Date/Time tools
  const datetimeTools = [
    'date-calculator',
    'time-calculator',
  ].map((slug) => ({
    url: `${baseUrl}/datetime/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Generators
  const generators = [
    'qr',
    'password',
    'random-number',
    'random-picker',
    'dice-roller',
    'card-shuffler',
  ].map((slug) => ({
    url: `${baseUrl}/generators/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: slug === 'qr' || slug === 'password' ? 0.8 : 0.7,
  }))

  // Text tools
  const textTools = [
    'word-counter',
  ].map((slug) => ({
    url: `${baseUrl}/text/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...financeCalculators,
    ...healthCalculators,
    ...converters,
    ...calculators,
    ...businessCalculators,
    ...datetimeTools,
    ...generators,
    ...textTools,
  ]
}