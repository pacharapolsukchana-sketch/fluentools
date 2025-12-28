import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('password')

export default function PasswordLayout({ children }: { children: React.ReactNode }) {
  return children
}