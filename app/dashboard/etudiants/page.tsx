"use client"

import { useState, useEffect } from "react"
import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface Student {
  id: number
  name: string
  image: string
  promotion: string
  specialization: string
  year: string
  skills: string[]
}

export default function EtudiantsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch("/api/students")
        const data = await response.json()
        setStudents(data.students)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching students:", error)
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex flex-col md:flex-row">
        <SidebarStudent />
        <div className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Étudiants</h1>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Nom et/ou prénom(s)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <Input placeholder="Rechercher par nom ou prénom" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Promotion
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <Input placeholder="Filtrer par promotion" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Spécialisation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <Input placeholder="Filtrer par spécialisation" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Année d'étude
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </label>
                <Input placeholder="Filtrer par année d'étude" />
              </div>
            </div>

            <div className="p-4">
              <Button>Filtrer</Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Skeleton className="h-9 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {students.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={student.image || "/placeholder.svg"}
                          alt={student.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{student.name}</h3>
                        <p className="text-sm text-gray-500 truncate">
                          Promotion {student.promotion} - {student.specialization}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{student.year}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {student.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" variant="outline">
                        Voir le profil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
