"use client"

import { useState, useEffect } from "react"
import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface Teacher {
  id: number
  lastName: string
  firstName: string
  grade: string
  email: string
  office: string | null
  image: string | null
}

export default function EnseignantsStudentPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await fetch("/api/teachers")
        const data = await response.json()
        setTeachers(data.teachers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching teachers:", error)
        setLoading(false)
      }
    }

    fetchTeachers()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Liste des enseignants</h1>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  Grade
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
                <Input placeholder="Filtrer par grade" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Situation
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
                <Input placeholder="Filtrer par situation" />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  Statut
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
                <Input placeholder="Filtrer par statut" />
              </div>
            </div>

            <div className="p-4">
              <Button>Filtrer</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="p-4">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-16 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left">Nom</th>
                      <th className="px-4 py-3 text-left">Prénom</th>
                      <th className="px-4 py-3 text-left">Grade</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">Bureau</th>
                      <th className="px-4 py-3 text-left">Photo</th>
                      <th className="px-4 py-3 text-left">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b">
                        <td className="px-4 py-3">{teacher.lastName}</td>
                        <td className="px-4 py-3">{teacher.firstName}</td>
                        <td className="px-4 py-3">{teacher.grade}</td>
                        <td className="px-4 py-3">{teacher.email}</td>
                        <td className="px-4 py-3">{teacher.office || "—"}</td>
                        <td className="px-4 py-3">
                          {teacher.image ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={teacher.image || "/placeholder.svg"}
                                alt={`${teacher.firstName} ${teacher.lastName}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                            Détail
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
