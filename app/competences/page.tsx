"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface CompetencesData {
  elements: {
    description: string
    competences: {
      courseCode: string
      courseTitle: string
      code: string
      title: string
      objective: string
      level: string
    }[]
  }
  filter: {
    fields: {
      name: string
      placeholder: string
    }[]
  }
  matrix: {
    description: string
  }
  base: {
    description: string
    categories: {
      name: string
      skills: string[]
    }[]
  }
}

export default function CompetencesPage() {
  const [data, setData] = useState<CompetencesData | null>(null)
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
        const response = await fetch("/api/competences")
        const competencesData = await response.json()
        setData(competencesData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching competences data:", error)
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
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Compétences développées à l'issue de nos formations
          </h1>

          <Tabs defaultValue="elements">
            <TabsList className="mb-4 flex overflow-x-auto pb-1 md:pb-0 md:flex-wrap">
              <TabsTrigger value="elements">Éléments de Compétences</TabsTrigger>
              <TabsTrigger value="filter">Filtrer et construire</TabsTrigger>
              <TabsTrigger value="matrix">Matrice de Compétences</TabsTrigger>
              <TabsTrigger value="base">Base des Compétences</TabsTrigger>
            </TabsList>

            <TabsContent value="elements">
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h2 className="text-lg md:text-xl font-semibold">Liste des éléments de compétences sélectionnés</h2>
                </div>

                <div className="p-4 bg-blue-50 border-b">
                  <p className="text-xs md:text-sm">
                    {loading ? <Skeleton className="h-4 md:h-5 w-full" /> : data?.elements.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  {isMobile ? (
                    // Mobile view - cards for competences
                    <div className="p-4 space-y-4">
                      {loading
                        ? Array(3)
                            .fill(0)
                            .map((_, index) => <Skeleton key={index} className="h-40 w-full" />)
                        : data?.elements.competences.map((comp, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden">
                              <div className="bg-gray-50 p-2 font-medium border-b flex justify-between">
                                <span>{comp.courseCode}</span>
                                <span>{comp.code}</span>
                              </div>
                              <div className="p-3 space-y-2">
                                <div className="grid grid-cols-1 gap-2 text-xs">
                                  <div>
                                    <span className="font-medium">Cours:</span> {comp.courseTitle}
                                  </div>
                                  <div>
                                    <span className="font-medium">Intitulé:</span> {comp.title}
                                  </div>
                                  <div>
                                    <span className="font-medium">Objectif:</span> {comp.objective}
                                  </div>
                                  <div>
                                    <span className="font-medium">Niveau:</span>{" "}
                                    <span
                                      className={`px-2 py-0.5 rounded text-xs ${
                                        comp.level === "Base"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {comp.level}
                                    </span>
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
                          <th className="px-4 py-3 text-left">Titre</th>
                          <th className="px-4 py-3 text-left">Code</th>
                          <th className="px-4 py-3 text-left">Intitulé</th>
                          <th className="px-4 py-3 text-left">Objectif</th>
                          <th className="px-4 py-3 text-left">Niveau</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(3)
                              .fill(0)
                              .map((_, index) => (
                                <tr key={index} className="border-b">
                                  <td colSpan={6} className="px-4 py-3">
                                    <Skeleton className="h-6 w-full" />
                                  </td>
                                </tr>
                              ))
                          : data?.elements.competences.map((comp, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-3">{comp.courseCode}</td>
                                <td className="px-4 py-3">{comp.courseTitle}</td>
                                <td className="px-4 py-3">{comp.code}</td>
                                <td className="px-4 py-3">{comp.title}</td>
                                <td className="px-4 py-3">{comp.objective}</td>
                                <td className="px-4 py-3">{comp.level}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="filter">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Filtrer et construire</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 md:mb-6">
                  {loading
                    ? Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index}>
                            <Skeleton className="h-4 md:h-5 w-24 md:w-32 mb-1" />
                            <Skeleton className="h-8 md:h-10 w-full" />
                          </div>
                        ))
                    : data?.filter.fields.map((field, index) => (
                        <div key={index}>
                          <label className="block text-xs md:text-sm font-medium mb-1">{field.name}</label>
                          <Input placeholder={field.placeholder} />
                        </div>
                      ))}
                </div>
                <Button size={isMobile ? "sm" : "default"}>Filtrer</Button>
              </div>
            </TabsContent>

            <TabsContent value="matrix">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Matrice de Compétences</h2>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  {loading ? <Skeleton className="h-4 md:h-5 w-full" /> : data?.matrix.description}
                </p>
                <div className="border rounded-lg p-6 md:p-8 flex items-center justify-center">
                  <p className="text-sm md:text-base text-gray-500">
                    Sélectionnez des éléments pour générer une matrice
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="base">
              <div className="bg-white rounded-lg shadow p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Base des Compétences</h2>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  {loading ? <Skeleton className="h-4 md:h-5 w-full" /> : data?.base.description}
                </p>
                <div className="border rounded-lg p-3 md:p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {loading
                      ? Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <div key={index}>
                              <Skeleton className="h-5 md:h-6 w-36 md:w-48 mb-2" />
                              <div className="space-y-1">
                                {Array(5)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Skeleton key={i} className="h-3 md:h-4 w-full" />
                                  ))}
                              </div>
                            </div>
                          ))
                      : data?.base.categories.map((category, index) => (
                          <div key={index}>
                            <h3 className="font-medium text-sm md:text-base mb-2">{category.name}</h3>
                            <ul className="list-disc pl-5 text-xs md:text-sm">
                              {category.skills.map((skill, skillIndex) => (
                                <li key={skillIndex}>{skill}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
