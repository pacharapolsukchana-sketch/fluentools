import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('currency')

export default function CurrencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}