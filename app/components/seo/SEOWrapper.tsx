// app/components/seo/SEOWrapper.tsx
// Component wrapper to inject SEO schemas

'use client'

import { ReactNode } from 'react'

interface SEOWrapperProps {
  children: ReactNode
  structuredData?: object
  faqSchema?: object
  breadcrumbSchema?: object
}

export default function SEOWrapper({ 
  children, 
  structuredData, 
  faqSchema, 
  breadcrumbSchema 
}: SEOWrapperProps) {
  return (
    <>
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(structuredData) 
          }}
        />
      )}

      {/* FAQ Schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(faqSchema) 
          }}
        />
      )}

      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(breadcrumbSchema) 
          }}
        />
      )}

      {children}
    </>
  )
}