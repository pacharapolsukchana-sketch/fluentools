import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('random-picker')

export default function RandomPickerLayout({ children }: { children: React.ReactNode }) {
  return children
}