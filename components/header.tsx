"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface User {
  email: string
  notifications: {
    id: number
    type: string
    content: string
    read: boolean
    date: string
  }[]
}

export default function Header() {
  const pathname = usePathname()
  const isLoggedIn = pathname.includes("/dashboard")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn) {
      async function fetchUserData() {
        try {
          const response = await fetch("/api/user")
          const data = await response.json()
          setUser(data)
          setLoading(false)
        } catch (error) {
          console.error("Error fetching user data:", error)
          setLoading(false)
        }
      }

      fetchUserData()
    }
  }, [isLoggedIn])

  const unreadNotifications = user?.notifications.filter((n) => !n.read).length || 0

  return (
    <header className="bg-slate-700 text-white p-4">
      <div className=" mx-auto flex justify-between items-center">
        <Link href="/" className="text-white hover:text-gray-200">
          Accueil
        </Link>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {loading ? (
                <span className="hidden md:flex text-sm">Chargement...</span>
              ) : (
                <span className="text-sm hidden md:flex">Connecté(e) en tant que {user?.email}</span>
              )}
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-white bg-slate-600">
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
                  className="lucide lucide-bell"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-white bg-slate-600">
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
                  className="lucide lucide-users"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-white bg-slate-600">
                <div className="relative">
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
                    className="lucide lucide-message-circle"
                  >
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                  </svg>
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
              </Button>
            </div>
          ) : (
            <Link href="/connexion">
              <Button variant="outline" size="sm" className="text-white border-white bg-slate-600">
                Connexion
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
