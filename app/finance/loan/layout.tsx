import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('loan')

export default function LoanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}