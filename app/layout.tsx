import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from '@/app/components/GoogleAnalytics'

export const metadata: Metadata = {
  verification: {
    google: "bHJoiO-4JPsFsTXsklt1b942C1azKZJK6YsCNi6dkMw",
  },
  title: "Free Online Calculators - Mortgage, BMI, Loan & More | Fluentools",
  description: "Free online calculators for mortgage, BMI, loan, discount, tip, and more. Fast, accurate, and private. No registration required.",
  keywords: "free calculator, online calculator, mortgage calculator, BMI calculator, loan calculator, discount calculator, tip calculator",
  authors: [{ name: "Fluentools" }],
  openGraph: {
    title: "Free Online Calculators - Mortgage, BMI, Loan & More",
    description: "Fast, accurate, and free online calculators. No registration required.",
    type: "website",
    locale: "en_US",
    siteName: "Fluentools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculators | Fluentools",
    description: "Fast, accurate, and free online calculators. No registration required.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-8308567969058624" />
        
        {/* PERFORMANCE OPTIMIZATION: Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://fluentools.com" />
        
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}