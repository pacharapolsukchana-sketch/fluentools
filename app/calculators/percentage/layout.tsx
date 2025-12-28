import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('percentage')

export default function PercentageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}