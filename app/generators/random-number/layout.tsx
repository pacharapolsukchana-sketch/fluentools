import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('random-number')

export default function RandomNumberLayout({ children }: { children: React.ReactNode }) {
  return children
}