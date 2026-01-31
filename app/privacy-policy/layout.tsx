import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy - Your Data Privacy | Fluentools",
  description: "Read Fluentools' privacy policy to understand how we protect your data. We respect your privacy and don't collect personal information.",
  keywords: "privacy policy, data privacy, fluentools privacy, user data protection",
  alternates: {
    canonical: "https://fluentools.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Fluentools",
    description: "Your privacy matters. Learn how we handle data on Fluentools.",
    url: "https://fluentools.com/privacy-policy",
    siteName: "Fluentools",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}