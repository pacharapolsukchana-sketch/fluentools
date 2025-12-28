import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('temperature')

export default function TemperatureLayout({ children }: { children: React.ReactNode }) {
  return children
}