"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface TalentsData {
  filters: {
    name: string
    placeholder: string
  }[]
  students: {
    id: number
    firstName: string
    lastName: string
    promotion: string
    specialization: string
    photo: string
    skills: string[]
    projects: string
    linkedin: string
    github: string
    portfolio: string
  }[]
}

export default function TalentsPage() {
  const [data, setData] = useState<TalentsData | null>(null)
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/talents")
        const talentsData = await response.json()
        setData(talentsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching talents data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Talents ESTIN</h1>

          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Rechercher des talents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-4 md:h-5 w-32 md:w-40 mb-1" />
                        <Skeleton className="h-8 md:h-10 w-full" />
                      </div>
                    ))
                : data?.filters.map((filter, index) => (
                    <div key={index}>
                      <label className="block text-xs md:text-sm font-medium mb-1">{filter.name}</label>
                      <Input placeholder={filter.placeholder} />
                    </div>
                  ))}
            </div>
            <Button size={isMobile ? "sm" : "default"}>Rechercher</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full" />
                          <div>
                            <Skeleton className="h-5 md:h-6 w-24 md:w-32 mb-1" />
                            <Skeleton className="h-3 md:h-4 w-36 md:w-48" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <Skeleton className="h-4 md:h-5 w-32 md:w-40 mb-1" />
                            <div className="flex flex-wrap gap-1 mt-1">
                              <Skeleton className="h-5 md:h-6 w-16 md:w-20" />
                              <Skeleton className="h-5 md:h-6 w-20 md:w-24" />
                              <Skeleton className="h-5 md:h-6 w-24 md:w-28" />
                            </div>
                          </div>
                          <div>
                            <Skeleton className="h-4 md:h-5 w-28 md:w-32 mb-1" />
                            <Skeleton className="h-3 md:h-4 w-full" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-8 md:h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
              : data?.students.map((student) => (
                  <Card key={student.id}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
                          <Image
                            src={student.photo || "/placeholder.svg"}
                            alt={`${student.firstName} ${student.lastName}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg">
                            {student.firstName} {student.lastName}
                          </CardTitle>
                          <CardDescription className="text-xs md:text-sm">
                            Promotion {student.promotion} - {student.specialization}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-xs md:text-sm font-medium">Compétences principales</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {student.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xs md:text-sm font-medium">Projets notables</h3>
                          <p className="text-xs md:text-sm text-gray-600">{student.projects}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" size={isMobile ? "sm" : "default"}>
                        Voir le profil complet
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}
