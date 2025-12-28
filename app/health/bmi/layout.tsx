import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('bmi')

export default function BMILayout({ children }: { children: React.ReactNode }) {
  return children
}