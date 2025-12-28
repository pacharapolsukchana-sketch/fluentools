import { Metadata } from 'next'
import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata: Metadata = generateMetadata('dice-roller')

export default function DiceRollerLayout({ children }: { children: React.ReactNode }) {
  return children
}