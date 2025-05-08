"use client"

import { useState, useEffect } from "react"
import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

interface JobOffer {
  id: number
  title: string
  company: string
  location: string
  salary: string
  experience: string
  description: string
  skills: string[]
  contractType: {
    text: string
    color: string
  }
}

interface ThesisOffer {
  id: number
  title: string
  supervisor: string
  institution: string
  field: string
  description: string
  keywords: string[]
}

interface ResearchProject {
  id: number
  title: string
  supervisor: string
  collaboration: string
  status: {
    text: string
    color: string
  }
  description: string
  opportunities: string[]
}

interface JobsData {
  offers: JobOffer[]
  theses: ThesisOffer[]
  projects: ResearchProject[]
}

export default function OffresPage() {
  const [jobsData, setJobsData] = useState<JobsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobsData() {
      try {
        const response = await fetch("/api/jobs")
        const data = await response.json()
        setJobsData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching jobs data:", error)
        setLoading(false)
      }
    }

    fetchJobsData()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Offres (thèses, emplois, ..)</h1>

          <Tabs defaultValue="emplois">
            <TabsList className="mb-4">
              <TabsTrigger value="emplois">Offres d'emploi</TabsTrigger>
              <TabsTrigger value="theses">Sujets de thèse</TabsTrigger>
              <TabsTrigger value="projets">Projets de recherche</TabsTrigger>
            </TabsList>

            <TabsContent value="emplois">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Offres d'emploi pour jeunes diplômés</h2>
                  <div className="flex w-full md:w-auto gap-2">
                    <Input placeholder="Rechercher une offre" className="max-w-xs" />
                    <Button>Rechercher</Button>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                          <Skeleton className="h-4 w-32 mt-1" />
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex flex-wrap gap-1 pt-2">
                              <Skeleton className="h-5 w-16" />
                              <Skeleton className="h-5 w-20" />
                              <Skeleton className="h-5 w-14" />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Skeleton className="h-9 w-full" />
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobsData?.offers.map((offer) => (
                      <Card key={offer.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{offer.title}</CardTitle>
                            <Badge className={`bg-${offer.contractType.color}-500`}>{offer.contractType.text}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {offer.company} - {offer.location}
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
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
                                className="text-gray-500"
                              >
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                              </svg>
                              <span>Salaire: {offer.salary}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
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
                                className="text-gray-500"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>Expérience: {offer.experience}</span>
                            </div>
                            <p className="text-sm">{offer.description}</p>
                            <div className="flex flex-wrap gap-1 pt-2">
                              {offer.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Voir l'offre complète</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2">
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
            </TabsContent>

            <TabsContent value="theses">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Sujets de thèse disponibles</h2>
                  <div className="flex w-full md:w-auto gap-2">
                    <Input placeholder="Rechercher un sujet" className="max-w-xs" />
                    <Button>Rechercher</Button>
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="h-64 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobsData?.theses.map((thesis) => (
                      <Card key={thesis.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{thesis.title}</CardTitle>
                            <Badge>{thesis.field}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            Encadrant: {thesis.supervisor} - {thesis.institution}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <p>{thesis.description}</p>
                            <div>
                              <h4 className="text-sm font-medium">Mots-clés:</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {thesis.keywords.map((keyword, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <Button>Demander plus d'informations</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="projets">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h2 className="text-xl font-semibold">Projets de recherche</h2>
                  <div className="flex w-full md:w-auto gap-2">
                    <Input placeholder="Rechercher un projet" className="max-w-xs" />
                    <Button>Rechercher</Button>
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="h-64 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobsData?.projects.map((project) => (
                      <Card key={project.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge className={`bg-${project.status.color}-500`}>{project.status.text}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            Responsable: {project.supervisor} - Collaboration avec {project.collaboration}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <p>{project.description}</p>
                            <div>
                              <h4 className="text-sm font-medium">Opportunités pour les étudiants:</h4>
                              <ul className="list-disc list-inside text-sm mt-1">
                                {project.opportunities.map((opportunity, index) => (
                                  <li key={index}>{opportunity}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-2 flex justify-end">
                              <Button>Postuler pour rejoindre le projet</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
