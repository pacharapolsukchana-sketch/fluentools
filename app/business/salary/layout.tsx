import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('salary')

export default function SalaryLayout({ children }: { children: React.ReactNode }) {
  return children
}