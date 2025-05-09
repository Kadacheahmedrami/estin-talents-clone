"use client"

import type React from "react"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function ConnexionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("hawiyat@estin.dz")
  const [password, setPassword] = useState("3am3am360")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur de connexion")
      }

      // Store user data in localStorage (in a real app, you'd use a more secure method)
      localStorage.setItem("user", JSON.stringify(data.user))

      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Erreur de connexion")
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Veuillez vérifier vos identifiants",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Banner />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Connexion</h1>

            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">{error}</div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Mot de passe
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Connexion en cours..." : "Connexion"}
                </Button>
                
                <div className="mt-4 text-center">
                <Link 
                  href="/api/pass" 
                  className="text-sm text-blue-600 hover:underline"
                  onClick={(e) => {
                  e.preventDefault();
                  fetch('/api/pass', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                  });
                  }}
                >
                  Mot de passe oublié?
                </Link>
                </div>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-gray-500 mb-4">-- OU --</p>
                <Button type="submit" variant="outline" className="w-full">
                  Connexion avec Google @estin.dz
                </Button>
              </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
