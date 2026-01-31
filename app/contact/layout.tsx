import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch | Fluentools",
  description: "Contact Fluentools for questions, feedback, or support. We're here to help with all your calculator and conversion tool needs.",
  keywords: "contact fluentools, calculator support, customer service, help, feedback",
  alternates: {
    canonical: "https://fluentools.com/contact",
  },
  openGraph: {
    title: "Contact Us - Get in Touch | Fluentools",
    description: "Have questions or feedback? Contact us for support with our online calculators.",
    url: "https://fluentools.com/contact",
    siteName: "Fluentools",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}