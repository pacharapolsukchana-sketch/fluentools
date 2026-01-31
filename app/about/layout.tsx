import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us - Free Online Calculators & Tools | Fluentools",
  description: "Learn about Fluentools - your trusted source for free, accurate online calculators. Discover our mission to provide fast, reliable calculation tools for everyone.",
  keywords: "about fluentools, online calculator tools, free calculators, about us",
  alternates: {
    canonical: "https://fluentools.com/about",
  },
  openGraph: {
    title: "About Us - Free Online Calculators | Fluentools",
    description: "Your trusted source for free, accurate online calculators and tools.",
    url: "https://fluentools.com/about",
    siteName: "Fluentools",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}