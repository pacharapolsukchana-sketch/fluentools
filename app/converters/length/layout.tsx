import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('length')

export default function LengthLayout({ children }: { children: React.ReactNode }) {
  return children
}