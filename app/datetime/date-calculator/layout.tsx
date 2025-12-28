import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('date-calculator')

export default function DateCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}