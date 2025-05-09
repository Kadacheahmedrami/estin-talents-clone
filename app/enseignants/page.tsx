"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { table } from "console"

interface EnseignantsData {
  notice: string
  filters: {
    name: string
    placeholder: string
  }[]
  teachers: {
    id: number
    lastName: string
    firstName: string
    grade: string
    email: string
    office: string | null
    photo: string | null
    specialization: string
    publications: number
    courses: string[]
  }[]
}

export default function EnseignantsPage() {
  const [data, setData] = useState<EnseignantsData | null>(null)
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
        const response = await fetch("/api/enseignants")
        const enseignantsData = await response.json()
        setData(enseignantsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching enseignants data:", error)
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Liste des enseignants</h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-yellow-800">
              {loading ? <Skeleton className="h-4 md:h-5 w-full" /> : data?.notice}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-4 md:h-5 w-32 md:w-40 mb-1" />
                        <Skeleton className="h-8 md:h-10 w-full" />
                      </div>
                    ))
                : data?.filters.map((filter, index) => (
                    <div key={index}>
                      <label className="flex items-center gap-2 text-xs md:text-sm font-medium mb-1">
                        {filter.name}
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
                      <Input placeholder={filter.placeholder} />
                    </div>
                  ))}
            </div>

            <div className="p-4">
              <Button size={isMobile ? "sm" : "default"}>Filtrer</Button>
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
              <>
                {isMobile ? (
                  // Mobile view - cards
                  <div className="grid grid-cols-1 gap-4 p-4">
                    {data?.teachers.map((teacher) => (
                      <Card key={teacher.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4 mb-3">
                            {teacher.photo ? (
                              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                                <Image
                                  src={teacher.photo || "/placeholder.svg"}
                                  alt={`${teacher.firstName} ${teacher.lastName}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                <span className="text-gray-500 font-medium">
                                  {teacher.firstName.charAt(0)}
                                  {teacher.lastName.charAt(0)}
                                </span>
                              </div>
                            )}
                            <div>
                              <h3 className="font-medium">
                                {teacher.lastName} {teacher.firstName}
                              </h3>
                              <p className="text-xs text-gray-500">{teacher.grade}</p>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs mb-3">
                            <div className="flex justify-between">
                              <span className="font-medium">Spécialisation:</span>
                              <span>{teacher.specialization}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Publications:</span>
                              <span>{teacher.publications}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Email:</span>
                              <span className="text-blue-600">{teacher.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">Bureau:</span>
                              <span>{teacher.office || "—"}</span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <h4 className="font-medium text-xs mb-1">Cours enseignés:</h4>
                            <div className="flex flex-wrap gap-1">
                              {teacher.courses.map((course, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end mt-3">
                            <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                              Détail
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Desktop view - table
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
                        {data?.teachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b">
                            <td className="px-4 py-3">{teacher.lastName}</td>
                            <td className="px-4 py-3">{teacher.firstName}</td>
                            <td className="px-4 py-3">{teacher.grade}</td>
                            <td className="px-4 py-3">{teacher.email}</td>
                            <td className="px-4 py-3">{teacher.office || "—"}</td>
                            <td className="px-4 py-3">
                              {teacher.photo ? (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={teacher.photo || "/placeholder.svg"}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
