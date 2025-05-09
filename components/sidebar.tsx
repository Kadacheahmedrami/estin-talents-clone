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
  ]

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className={cn(
        "md:hidden w-80 fixed top-3 z-30",
        isMobileMenuOpen ? "left-60" : "left-2"
      )}>
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
          "w-80 md:w-[17%] border-r bg-white z-20 transition-all duration-300 ease-in-out",
          isMobile ? "fixed inset-y-0 left-0 transform" : "relative",
          isMobile && !isMobileMenuOpen ? "-translate-x-full" : "translate-x-0",
          isMobile && isMobileMenuOpen ? "shadow-xl" : "",
        )}
      >
        <div className="px-4 py-2 ">
          <div className="font-light ">Bienvenue</div>
          <div className="text-sm font-bold mt-2 text-gray-800">VISITEUR</div>
        </div>
        <nav className="overflow-y-auto max-h-[calc(100vh-64px)]">
          <ul>
            {visitorLinks.map((link) => (
                <li key={link.href} className="border mx-4 rounded-md line-clamp-1 hover:border-blue-500 transition-all duration-200">
                <Link
                  href={link.href}
                  className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-blue-50 rounded-md",
                  pathname === link.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600",
                  )}
                >
                  <IconComponent name={link.icon} />
                  <span className="font-medium text-base text-blue-600">{link.label}</span>
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
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M12 3L2 8.5V10H22V8.5L12 3Z" />
        <path d="M5 10V17" />
        <path d="M19 10V17" />
        <path d="M2 21H22" />
        <path d="M15 21V14.5C15 13.672 14.328 13 13.5 13H10.5C9.672 13 9 13.672 9 14.5V21" />
      </svg>
    ),
    "check": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    "users": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "academic-cap": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M12 4L3 9L12 14L21 9L12 4Z" />
        <path d="M3 18L12 23L21 18" />
        <path d="M3 14L12 19L21 14" />
      </svg>
    ),
    "layers": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
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