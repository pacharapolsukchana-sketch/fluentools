import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms of Service - Usage Guidelines | Fluentools",
  description: "Read Fluentools' terms of service to understand the guidelines for using our free online calculators and conversion tools.",
  keywords: "terms of service, usage terms, fluentools terms, user agreement",
  alternates: {
    canonical: "https://fluentools.com/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Fluentools",
    description: "Terms and conditions for using Fluentools calculators.",
    url: "https://fluentools.com/terms-of-service",
    siteName: "Fluentools",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}