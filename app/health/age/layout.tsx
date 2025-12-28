import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('age')

export default function AgeLayout({ children }: { children: React.ReactNode }) {
  return children
}