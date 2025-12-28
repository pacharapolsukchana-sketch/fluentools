// app/sitemap.ts
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
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Finance calculators
  const financeCalculators = [
    'tip',
    'mortgage',
    'loan',
    'discount',
    'roi',
    'compound-interest',
  ].map((slug) => ({
    url: `${baseUrl}/finance/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Health calculators
  const healthCalculators = [
    'bmi',
    'calorie',
    'age',
    'pregnancy',
    'bmi-女性',
  ].map((slug) => ({
    url: `${baseUrl}/health/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Converters
  const converters = [
    'currency',
    'unit',
    'time-zone',
    'temperature',
  ].map((slug) => ({
    url: `${baseUrl}/converters/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Generators
  const generators = [
    'qr',
    'password',
    'random-number',
    'uuid',
  ].map((slug) => ({
    url: `${baseUrl}/generators/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Calculators
  const calculators = [
    'percentage',
    'ratio',
    'fraction',
  ].map((slug) => ({
    url: `${baseUrl}/calculators/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Business calculators
  const businessCalculators = [
    'margin',
    'markup',
  ].map((slug) => ({
    url: `${baseUrl}/business/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Date/Time tools
  const datetimeTools = [
    'date-calculator',
    'days-between',
  ].map((slug) => ({
    url: `${baseUrl}/datetime/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Text tools
  const textTools = [
    'word-counter',
    'character-counter',
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
    ...generators,
    ...calculators,
    ...businessCalculators,
    ...datetimeTools,
    ...textTools,
  ]
}