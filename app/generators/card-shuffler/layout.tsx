import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('card-shuffler')

export default function CardShufflerLayout({ children }: { children: React.ReactNode }) {
  return children
}