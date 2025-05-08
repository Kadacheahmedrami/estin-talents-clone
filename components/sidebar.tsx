"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const visitorLinks = [
    { href: "/programmes", label: "Programmes", icon: "building-library" },
    { href: "/competences", label: "Compétences", icon: "check" },
    { href: "/talents", label: "Talents", icon: "users" },
    { href: "/enseignants", label: "Enseignants", icon: "academic-cap" },
  ]

  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4 border-b">
        <div className="font-medium">Bienvenue</div>
        <div className="text-sm font-semibold mt-2">VISITEUR</div>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {visitorLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors",
                  pathname === link.href && "bg-blue-50 text-blue-600",
                )}
              >
                <IconComponent name={link.icon} />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function IconComponent({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    "building-library": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M12 2v20M2 6h20M2 18h20M2 12h20" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    users: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "academic-cap": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  }

  return icons[name] || null
}
