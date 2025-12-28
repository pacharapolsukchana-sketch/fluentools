import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('word-counter')

export default function WordCounterLayout({ children }: { children: React.ReactNode }) {
  return children
}