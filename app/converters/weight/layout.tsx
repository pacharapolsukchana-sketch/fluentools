import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('weight')

export default function WeightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}