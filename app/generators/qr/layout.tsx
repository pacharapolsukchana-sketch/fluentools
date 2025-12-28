import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('qr')

export default function QRLayout({ children }: { children: React.ReactNode }) {
  return children
}