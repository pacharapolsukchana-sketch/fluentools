import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('time-calculator')

export default function TimeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}