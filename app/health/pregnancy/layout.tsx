import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('pregnancy')

export default function PregnancyLayout({ children }: { children: React.ReactNode }) {
  return children
}