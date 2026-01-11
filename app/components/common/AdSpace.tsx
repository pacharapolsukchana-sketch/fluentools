'use client'

import { useEffect } from 'react'

interface AdSpaceProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  responsive?: boolean
  style?: React.CSSProperties
  className?: string
  hideOnMobile?: boolean
}

export default function AdSpace({ 
  slot, 
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
  hideOnMobile = false
}: AdSpaceProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  const responsiveClass = hideOnMobile ? 'hidden md:block' : 'block'

  return (
    <div className={`ad-container my-4 ${responsiveClass} ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-8308567969058624"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}