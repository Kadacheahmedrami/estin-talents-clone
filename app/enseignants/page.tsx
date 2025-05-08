"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Liste des enseignants</h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">{loading ? <Skeleton className="h-5 w-full" /> : data?.notice}</p>
          </div>

          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              {loading
                ? Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-5 w-40 mb-1" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))
                : data?.filters.map((filter, index) => (
                    <div key={index}>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1">
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
              <Button>Filtrer</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  {loading
                    ? Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={index} className="border-b">
                            <td colSpan={7} className="px-4 py-3">
                              <Skeleton className="h-10 w-full" />
                            </td>
                          </tr>
                        ))
                    : data?.teachers.map((teacher) => (
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
          </div>
        </div>
      </div>
    </div>
  )
}
