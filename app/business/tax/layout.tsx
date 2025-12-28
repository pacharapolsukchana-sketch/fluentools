import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('tax')

export default function TaxLayout({ children }: { children: React.ReactNode }) {
  return children
}