import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from '@/app/components/GoogleAnalytics'
import GoogleAdSense from '@/app/components/GoogleAdSense'

export const metadata: Metadata = {
  verification: {
    google: "bHJoiO-4JPsFsTXsklt1b942C1azKZJK6YsCNi6dkMw",
  },
  title: "Fluentools: Free Online Calculators - Mortgage, BMI, Loan",
  description: "Free online calculators for mortgage, BMI, loan, discount, tip, and more. Fast, accurate, and private. No registration required.",
  keywords: "free calculator, online calculator, mortgage calculator, BMI calculator, loan calculator, discount calculator, tip calculator",
  authors: [{ name: "Fluentools" }],
  alternates: {
    canonical: "https://fluentools.com",
  },
  openGraph: {
    title: "Fluentools: Free Online Calculators - Mortgage, BMI, Loan",
    description: "Fast, accurate, and free online calculators. No registration required.",
    url: "https://fluentools.com",
    type: "website",
    locale: "en_US",
    siteName: "Fluentools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluentools: Free Online Calculators - Mortgage, BMI, Loan",
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
        <meta name="google-adsense-account" content="ca-pub-8308567969058624" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        {/* Favicon - ICO first for Google Search, then modern icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <GoogleAdSense />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}