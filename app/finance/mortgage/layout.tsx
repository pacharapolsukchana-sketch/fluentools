import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('mortgage')

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}