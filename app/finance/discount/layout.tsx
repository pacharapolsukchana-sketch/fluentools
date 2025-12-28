import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('discount')

export default function DiscountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}