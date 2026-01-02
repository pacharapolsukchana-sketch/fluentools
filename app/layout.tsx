import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from '@/app/components/GoogleAnalytics'
import { Suspense } from 'react'

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
        <meta name="google-adsense-account" content="ca-pub-8308567969058624" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="canonical" href="https://fluentools.com" />
        
        {/* Critical CSS Inline */}
        <style dangerouslySetInnerHTML={{__html: `
          *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
          html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif}
          body{margin:0;line-height:inherit}
          h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}
          a{color:inherit;text-decoration:inherit}
          button,input{font-family:inherit;font-size:100%;line-height:inherit;margin:0;padding:0}
          button{cursor:pointer}
          img,svg{display:block;vertical-align:middle}
        `}} />
      </head>
      <body className="antialiased">
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}