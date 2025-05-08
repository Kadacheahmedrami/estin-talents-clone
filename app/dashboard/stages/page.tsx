"use client"

import { useState, useEffect } from "react"
import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface InternshipOffer {
  id: number
  title: string
  company: string
  location: string
  duration: string
  compensation: string
  description: string
  badge: {
    text: string
    color: string
  } | null
}

interface InternshipApplication {
  id: number
  title: string
  company: string
  location: string
  applicationDate: string
  startDate?: string
  endDate?: string
  responseDate?: string
  reason?: string
  status: {
    text: string
    color: string
  }
}

interface InternshipDocument {
  id: number
  title: string
  type: string
  size: string
  description: string
  url: string
}

interface CalendarEvent {
  id: number
  date: string
  title: string
  description: string
}

interface InternshipData {
  offers: InternshipOffer[]
  applications: InternshipApplication[]
  documents: InternshipDocument[]
  calendar: CalendarEvent[]
}

export default function StagesPage() {
  const [internshipData, setInternshipData] = useState<InternshipData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInternshipData() {
      try {
        const response = await fetch("/api/internships")
        const data = await response.json()
        setInternshipData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching internship data:", error)
        setLoading(false)
      }
    }

    fetchInternshipData()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Stages de fin d'études</h1>

          <Tabs defaultValue="offres">
            <TabsList className="mb-4">
              <TabsTrigger value="offres">Offres de stage</TabsTrigger>
              <TabsTrigger value="candidatures">Mes candidatures</TabsTrigger>
              <TabsTrigger value="guide">Guide et documents</TabsTrigger>
            </TabsList>

            <TabsContent value="offres">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Offres de stage disponibles</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
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
                        className="mr-1"
                      >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </svg>
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm">
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
                        className="mr-1"
                      >
                        <line x1="21" x2="3" y1="6" y2="6" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                        <line x1="17" x2="3" y1="18" y2="18" />
                      </svg>
                      Trier par
                    </Button>
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
                    {internshipData?.offers.map((offer) => (
                      <Card key={offer.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{offer.title}</CardTitle>
                            {offer.badge && <Badge className={`bg-${offer.badge.color}-500`}>{offer.badge.text}</Badge>}
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
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              <span>Durée: {offer.duration}</span>
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
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                              </svg>
                              <span>Rémunération: {offer.compensation}</span>
                            </div>
                            <p className="text-sm">{offer.description}</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Postuler</Button>
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

            <TabsContent value="candidatures">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Mes candidatures</h2>

                {loading ? (
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <Skeleton key={index} className="h-40 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {internshipData?.applications.map((application) => (
                      <div key={application.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-blue-50 p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{application.title}</h3>
                            <p className="text-sm text-gray-600">
                              {application.company} - {application.location}
                            </p>
                          </div>
                          <Badge className={`bg-${application.status.color}-500`}>{application.status.text}</Badge>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Date de candidature</h4>
                              <p>{application.applicationDate}</p>
                            </div>
                            {application.status.text === "Acceptée" || application.status.text === "En attente" ? (
                              <>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">
                                    Date de début{application.status.text === "En attente" ? " prévue" : ""}
                                  </h4>
                                  <p>{application.startDate}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">
                                    Date de fin{application.status.text === "En attente" ? " prévue" : ""}
                                  </h4>
                                  <p>{application.endDate}</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Date de réponse</h4>
                                  <p>{application.responseDate}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500">Motif</h4>
                                  <p>{application.reason}</p>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Voir les détails
                            </Button>
                            {application.status.text === "Acceptée" && (
                              <Button size="sm" variant="outline">
                                Contacter l'entreprise
                              </Button>
                            )}
                            {application.status.text === "En attente" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-500 border-red-500 hover:bg-red-50"
                              >
                                Annuler ma candidature
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="guide">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-6">Guide et documents</h2>

                {loading ? (
                  <div className="space-y-6">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Processus de stage</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="border rounded-lg p-4 text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 font-bold">1</span>
                          </div>
                          <h4 className="font-medium mb-1">Recherche</h4>
                          <p className="text-sm text-gray-600">Consultez les offres et postulez</p>
                        </div>

                        <div className="border rounded-lg p-4 text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 font-bold">2</span>
                          </div>
                          <h4 className="font-medium mb-1">Sélection</h4>
                          <p className="text-sm text-gray-600">Entretiens et validation</p>
                        </div>

                        <div className="border rounded-lg p-4 text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 font-bold">3</span>
                          </div>
                          <h4 className="font-medium mb-1">Convention</h4>
                          <p className="text-sm text-gray-600">Signature de la convention</p>
                        </div>

                        <div className="border rounded-lg p-4 text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-blue-600 font-bold">4</span>
                          </div>
                          <h4 className="font-medium mb-1">Réalisation</h4>
                          <p className="text-sm text-gray-600">Suivi et soutenance</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Documents à télécharger</h3>
                      <div className="space-y-3">
                        {internshipData?.documents.map((doc) => (
                          <div key={doc.id} className="border rounded-lg p-4 flex items-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-500"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <div>
                              <h4 className="font-medium">{doc.title}</h4>
                              <p className="text-sm text-gray-500">
                                {doc.type} - {doc.size}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                              <Button size="sm" variant="link" className="p-0 h-auto mt-1">
                                Télécharger
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Calendrier</h3>
                      <div className="border rounded-lg p-4">
                        <ul className="space-y-3">
                          {internshipData?.calendar.map((event) => (
                            <li key={event.id} className="flex items-start gap-3">
                              <div className="min-w-[100px] text-sm font-medium">{event.date}</div>
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-gray-600">{event.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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
