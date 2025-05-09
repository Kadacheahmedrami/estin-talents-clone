"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ProgrammesData {
  catalogue: {
    description: string
    filters: string[]
    courses: {
      code: string
      precision: string
      title: string
      domain: string
      credit: number
      coefficient: number
      edition: string
      lectureHours: string
      tutorialHours: string
      practicalHours: string
    }[]
  }
  repartition: {
    byDomain: {
      name: string
      credits: number
      percentage: number
    }[]
    bySemester: {
      name: string
      credits: number
      percentage: number
    }[]
  }
  programmes: {
    title: string
    description: string
    link: string
  }[]
}

export default function ProgrammesPage() {
  const [data, setData] = useState<ProgrammesData | null>(null)
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
        const response = await fetch("/api/programmes")
        const programmesData = await response.json()
        setData(programmesData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching programmes data:", error)
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Nos programmes</h1>

          <Tabs defaultValue="catalogue">
            <TabsList className="mb-4 flex overflow-x-auto pb-1 md:pb-0 md:flex-wrap">
              <TabsTrigger value="catalogue">Catalogue des matières</TabsTrigger>
              <TabsTrigger value="repartition">Répartition des crédits</TabsTrigger>
              <TabsTrigger value="programmes">Programmes</TabsTrigger>
            </TabsList>

            <TabsContent value="catalogue">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg md:text-xl font-semibold">Catalogue des Matières :</h2>
                </div>

                <div className="p-4 bg-blue-50 border-b">
                  <p className="text-xs md:text-sm">
                    {loading ? <Skeleton className="h-8 md:h-10 w-full" /> : data?.catalogue.description}
                  </p>
                </div>

                <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                  {loading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index}>
                            <Skeleton className="h-4 md:h-5 w-20 md:w-24 mb-1" />
                            <Skeleton className="h-8 md:h-10 w-full" />
                          </div>
                        ))
                    : data?.catalogue.filters.map((filter, index) => (
                        <div key={index}>
                          <label className="flex items-center gap-2 text-xs md:text-sm font-medium mb-1">
                            {filter}
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
                          <Input placeholder={filter} />
                        </div>
                      ))}
                </div>

                <div className="p-4">
                  <Button>Filtrer</Button>
                </div>

                <div className="overflow-x-auto">
                  {isMobile ? (
                    // Mobile view - cards for courses
                    <div className="p-4 space-y-4">
                      {loading
                        ? Array(3)
                            .fill(0)
                            .map((_, index) => <Skeleton key={index} className="h-32 w-full" />)
                        : data?.catalogue.courses.map((course, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-2 font-medium border-b flex justify-between">
                                <span>{course.code}</span>
                                <span>{course.precision}</span>
                              </div>
                              <div className="p-3 space-y-2">
                                <div className="font-medium border-b border-gray-300 pb-1">{course.title}</div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="font-medium">Domaine:</span> {course.domain}
                                  </div>
                                  <div>
                                    <span className="font-medium">Crédit:</span> {course.credit}
                                  </div>
                                  <div>
                                    <span className="font-medium">Coef:</span> {course.coefficient}
                                  </div>
                                  <div>
                                    <span className="font-medium">Edition:</span> {course.edition}
                                  </div>
                                  <div>
                                    <span className="font-medium">Cours:</span> {course.lectureHours}
                                  </div>
                                  <div>
                                    <span className="font-medium">TD:</span> {course.tutorialHours}
                                  </div>
                                  <div>
                                    <span className="font-medium">TP:</span> {course.practicalHours}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  ) : (
                    // Desktop view - table
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left">Code</th>
                          <th className="px-4 py-3 text-left">Precision</th>
                          <th className="px-4 py-3 text-left">Titre</th>
                          <th className="px-4 py-3 text-left">Domaine de connaissances</th>
                          <th className="px-4 py-3 text-left">Credit</th>
                          <th className="px-4 py-3 text-left">Coef</th>
                          <th className="px-4 py-3 text-left">Edition</th>
                          <th className="px-4 py-3 text-left">Volume horaire cours</th>
                          <th className="px-4 py-3 text-left">Volume horaire TD</th>
                          <th className="px-4 py-3 text-left">Volume horaire TP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <tr key={index} className="border-b">
                                  <td colSpan={10} className="px-4 py-3">
                                    <Skeleton className="h-6 w-full" />
                                  </td>
                                </tr>
                              ))
                          : data?.catalogue.courses.map((course, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-3">{course.code}</td>
                                <td className="px-4 py-3">{course.precision}</td>
                                <td className="px-4 py-3 border border-gray-300">{course.title}</td>
                                <td className="px-4 py-3">{course.domain}</td>
                                <td className="px-4 py-3">{course.credit}</td>
                                <td className="px-4 py-3">{course.coefficient}</td>
                                <td className="px-4 py-3">{course.edition}</td>
                                <td className="px-4 py-3">{course.lectureHours}</td>
                                <td className="px-4 py-3">{course.tutorialHours}</td>
                                <td className="px-4 py-3">{course.practicalHours}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="repartition">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Répartition des crédits</h2>
                <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
                  Visualisez la répartition des crédits par domaine de connaissance et par semestre.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="border rounded-lg p-3 md:p-4">
                    <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Répartition par domaine</h3>
                    {loading ? (
                      <div className="space-y-3 md:space-y-4">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <div key={index}>
                              <Skeleton className="h-4 md:h-5 w-full mb-1" />
                              <Skeleton className="h-2 md:h-2.5 w-full" />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {data?.repartition.byDomain.map((domain, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-xs md:text-sm">
                              <span>{domain.name}</span>
                              <span className="font-medium">{domain.credits} crédits</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                              <div
                                className="bg-blue-600 h-2 md:h-2.5 rounded-full"
                                style={{ width: `${domain.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="border rounded-lg p-3 md:p-4">
                    <h3 className="font-medium mb-2 md:mb-3 text-sm md:text-base">Répartition par semestre</h3>
                    {loading ? (
                      <div className="space-y-3 md:space-y-4">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <div key={index}>
                              <Skeleton className="h-4 md:h-5 w-full mb-1" />
                              <Skeleton className="h-2 md:h-2.5 w-full" />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {data?.repartition.bySemester.map((semester, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-xs md:text-sm">
                              <span>{semester.name}</span>
                              <span className="font-medium">{semester.credits} crédits</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                              <div
                                className="bg-green-600 h-2 md:h-2.5 rounded-full"
                                style={{ width: `${semester.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programmes">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Programmes</h2>
                <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
                  Consultez les programmes détaillés de nos formations.
                </p>

                <div className="space-y-3 md:space-y-4">
                  {loading
                    ? Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index} className="border rounded-lg p-3 md:p-4">
                            <Skeleton className="h-5 md:h-6 w-3/4 mb-2" />
                            <Skeleton className="h-3 md:h-4 w-full mb-3" />
                            <Skeleton className="h-8 md:h-10 w-32 md:w-40" />
                          </div>
                        ))
                    : data?.programmes.map((programme, index) => (
                        <div key={index} className="border rounded-lg p-3 md:p-4">
                          <h3 className="font-medium text-base md:text-lg mb-1 md:mb-2">{programme.title}</h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">{programme.description}</p>
                          <Button variant="outline" size={isMobile ? "sm" : "default"}>
                            Voir le programme détaillé
                          </Button>
                        </div>
                      ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
