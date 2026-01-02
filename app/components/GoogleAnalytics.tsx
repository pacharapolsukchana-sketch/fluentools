'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Defer GA loading after page is interactive
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 2000) // รอ 2 วินาทีหลังเว็บโหลดเสร็จ

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-6K8LDXCP98`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6K8LDXCP98', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}