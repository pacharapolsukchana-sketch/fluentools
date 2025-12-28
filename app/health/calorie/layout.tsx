import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('calorie')

export default function CalorieLayout({ children }: { children: React.ReactNode }) {
  return children
}