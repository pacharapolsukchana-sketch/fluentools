import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('ratio')

export default function RatioLayout({ children }: { children: React.ReactNode }) {
  return children
}