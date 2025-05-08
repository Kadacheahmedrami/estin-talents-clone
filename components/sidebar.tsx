"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect, JSX } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const visitorLinks = [
    { href: "/programmes", label: "Programmes", icon: "building-library" },
    { href: "/competences", label: "Compétences", icon: "check" },
    { href: "/talents", label: "Talents", icon: "users" },
    { href: "/enseignants", label: "Enseignants", icon: "academic-cap" },
    { href: "/architecture", label: "Architecture des études", icon: "layers" },
  ]

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed top-3 left-20 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 border-r bg-white z-20 transition-all duration-300 ease-in-out",
          isMobile ? "fixed inset-y-0 left-0 transform" : "relative",
          isMobile && !isMobileMenuOpen ? "-translate-x-full" : "translate-x-0",
          isMobile && isMobileMenuOpen ? "shadow-xl" : "",
        )}
      >
        <div className="p-4 border-b">
          <div className="font-medium">Bienvenue</div>
          <div className="text-sm font-semibold mt-2">VISITEUR</div>
        </div>
        <nav className="p-2 overflow-y-auto max-h-[calc(100vh-64px)]">
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

      {/* Overlay for mobile */}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
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
    layers: (
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
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  }

  return icons[name] || null
}
