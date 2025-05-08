"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
// Define types properly
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  specialization: string
  year: string
  promotion: string
  profileImage: string
  notifications: {
    id: number
    type: string
    content: string
    read: boolean
    date: string
  }[]
}

// Simple icon components with consistent styling
function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  )
}

function TeacherIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}

function StudentsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export default function SidebarStudent() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user')
        if (!response.ok) throw new Error('Failed to fetch user')
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])


  // Detect mobile screen
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])


  return (

    <>
        <div className="w-full   py-4 px-3">
      {/* Simple header with username */}
      <div className="px-4 pb-4">
        <div className="font-medium">
          {loading ? "Bienvenue" : user ? `Bienvenue ${user.lastName.toUpperCase()}` : "Bienvenue"}
        </div>
      </div>

      <div className="md:hidden fixed top-3 left-2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <aside
        className={cn(
          " py-4 px-3 bg-white  text-gray-700 z-20 transition-transform duration-300 ease-in-out",
          isMobile
            ? isMobileMenuOpen
              ? "translate-x-0 fixed inset-y-0 left-0 shadow-xl"
              : "-translate-x-full fixed inset-y-0 left-0"
            : "translate-x-0 relative"
        )}
      >


<nav className="flex flex-col border-r border-gray-300 min-h-screen pr-4  space-y-2">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard" && "bg-slate-800"
          )}
        >
          <UserIcon />
          Mon espace Étudiant
        </Link>
        
        <Link
          href="/dashboard/dashboards"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/dashboards" && "bg-slate-800"
          )}
        >
          <ChartIcon />
          Dashboards
        </Link>
        
        <Link
          href="/dashboard/enseignants"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/enseignants" && "bg-slate-800"
          )}
        >
          <TeacherIcon />
          Enseignants
        </Link>
        
        <Link
          href="/dashboard/etudiants"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/etudiants" && "bg-slate-800"
          )}
        >
          <StudentsIcon />
          Étudiants
        </Link>
        
        <Link
          href="/dashboard/pedagogie"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/pedagogie" && "bg-slate-800"
          )}
        >
          <BookIcon />
          Pédagogie
        </Link>
        
        <Link
          href="/dashboard/stages"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/stages" && "bg-slate-800"
          )}
        >
          <SearchIcon />
          Stages de fin d'études
        </Link>
        
        <Link
          href="/dashboard/offres"
          className={cn(
            "flex items-center  h-[37px] px-4 bg-slate-700 text-white rounded-md hover:bg-slate-600",
            pathname === "/dashboard/offres" && "bg-slate-800"
          )}
        >
          <BriefcaseIcon />
          Offres (thèses, emplois, ..)
        </Link>
      </nav>
        </aside>
      {/* Navigation links - with rounded corners and gaps between items */}
     
    </div>
    {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}