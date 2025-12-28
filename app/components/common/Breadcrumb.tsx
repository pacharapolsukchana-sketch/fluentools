import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="text-gray-500 hover:text-blue-600 transition"
      >
        🏠 Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          
          {item.href ? (
            <Link 
              href={item.href}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}