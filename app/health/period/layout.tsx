import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('period')

export default function PeriodLayout({ children }: { children: React.ReactNode }) {
  return children
}