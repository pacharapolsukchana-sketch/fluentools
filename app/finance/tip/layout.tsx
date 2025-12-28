import { generateMetadata } from '@/app/lib/seoConfig'

export const metadata = generateMetadata('tip')

export default function TipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}