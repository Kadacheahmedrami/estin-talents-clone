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
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Talents ESTIN</h1>

          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <h2 className="text-xl font-semibold mb-4">Rechercher des talents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))
                : data?.filters.map((filter, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium mb-1">{filter.name}</label>
                      <Input placeholder={filter.placeholder} />
                    </div>
                  ))}
            </div>
            <Button>Rechercher</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <Skeleton className="w-16 h-16 rounded-full" />
                          <div>
                            <Skeleton className="h-6 w-32 mb-1" />
                            <Skeleton className="h-4 w-48" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <Skeleton className="h-5 w-40 mb-1" />
                            <div className="flex flex-wrap gap-1 mt-1">
                              <Skeleton className="h-6 w-20" />
                              <Skeleton className="h-6 w-24" />
                              <Skeleton className="h-6 w-28" />
                            </div>
                          </div>
                          <div>
                            <Skeleton className="h-5 w-32 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-10 w-full" />
                      </CardFooter>
                    </Card>
                  ))
              : data?.students.map((student) => (
                  <Card key={student.id}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={student.photo || "/placeholder.svg"}
                            alt={`${student.firstName} ${student.lastName}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>
                            {student.firstName} {student.lastName}
                          </CardTitle>
                          <CardDescription>
                            Promotion {student.promotion} - {student.specialization}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h3 className="text-sm font-medium">Compétences principales</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {student.skills.map((skill, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Projets notables</h3>
                          <p className="text-sm text-gray-600">{student.projects}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
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
