"use client"

import { useState, useEffect } from "react"
import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Course {
  id: number
  title: string
  code: string
  credits: number
  teacher: string
  progress: {
    completed: number
    total: number
    percentage: number
  }
  color: string
}

interface ScheduleDay {
  day: string
  slots: {
    time: string
    course: {
      title: string
      type: string
      room: string | null
      color: string
    } | null
  }[]
}

interface Schedule {
  week: string
  days: ScheduleDay[]
}

interface Grade {
  id: number
  name: string
  code: string
  credits: number
  continuousAssessment: number | null
  practicalWork: number | null
  exam: number | null
  average: number
  status: string
}

interface SemesterHistory {
  id: number
  name: string
  average: number
  credits: number
  totalCredits: number
  status: string
}

interface Grades {
  currentSemester: {
    name: string
    modules: Grade[]
  }
  history: SemesterHistory[]
}

interface Document {
  id: number
  title: string
  type: string
  size: string
  url: string
}

interface CourseDocument {
  id: number
  course: string
  files: {
    id: number
    title: string
    type: string
    url: string
  }[]
}

interface Documents {
  general: Document[]
  courses: CourseDocument[]
}

export default function PedagogiePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [grades, setGrades] = useState<Grades | null>(null)
  const [documents, setDocuments] = useState<Documents | null>(null)
  const [loading, setLoading] = useState({
    courses: true,
    schedule: true,
    grades: true,
    documents: true,
  })

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses")
        const data = await response.json()
        setCourses(data.courses)
        setLoading((prev) => ({ ...prev, courses: false }))
      } catch (error) {
        console.error("Error fetching courses:", error)
        setLoading((prev) => ({ ...prev, courses: false }))
      }
    }

    async function fetchSchedule() {
      try {
        const response = await fetch("/api/schedule")
        const data = await response.json()
        setSchedule(data)
        setLoading((prev) => ({ ...prev, schedule: false }))
      } catch (error) {
        console.error("Error fetching schedule:", error)
        setLoading((prev) => ({ ...prev, schedule: false }))
      }
    }

    async function fetchGrades() {
      try {
        const response = await fetch("/api/grades")
        const data = await response.json()
        setGrades(data)
        setLoading((prev) => ({ ...prev, grades: false }))
      } catch (error) {
        console.error("Error fetching grades:", error)
        setLoading((prev) => ({ ...prev, grades: false }))
      }
    }

    async function fetchDocuments() {
      try {
        const response = await fetch("/api/documents")
        const data = await response.json()
        setDocuments(data)
        setLoading((prev) => ({ ...prev, documents: false }))
      } catch (error) {
        console.error("Error fetching documents:", error)
        setLoading((prev) => ({ ...prev, documents: false }))
      }
    }

    fetchCourses()
    fetchSchedule()
    fetchGrades()
    fetchDocuments()
  }, [])

  return (
    <div>
      <Banner />
      <div className="flex">
        <SidebarStudent />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Pédagogie</h1>

          <Tabs defaultValue="cours">
            <TabsList className="mb-4">
              <TabsTrigger value="cours">Mes cours</TabsTrigger>
              <TabsTrigger value="emploi">Emploi du temps</TabsTrigger>
              <TabsTrigger value="notes">Notes et résultats</TabsTrigger>
              <TabsTrigger value="documents">Documents pédagogiques</TabsTrigger>
            </TabsList>

            <TabsContent value="cours">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Mes cours du semestre</h2>
                {loading.courses ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <Skeleton className="h-6 w-40 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-20" />
                              <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex justify-between">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-2 w-full" />
                            <Skeleton className="h-9 w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id}>
                        <CardHeader className={`bg-${course.color}-50 pb-2`}>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <p className="text-sm text-gray-500">
                            {course.code} - {course.credits} crédits
                          </p>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Enseignant:</span>
                              <span className="font-medium">{course.teacher}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Progression:</span>
                              <span className="font-medium">
                                {course.progress.completed}/{course.progress.total} séances
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`bg-${course.color}-600 h-2 rounded-full`}
                                style={{ width: `${course.progress.percentage}%` }}
                              ></div>
                            </div>
                            <div className="pt-2">
                              <Button size="sm" className="w-full">
                                Accéder au cours
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="emploi">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Emploi du temps - Semaine du{" "}
                  {loading.schedule ? <Skeleton className="inline-block h-4 w-32" /> : schedule?.week}
                </h2>

                {loading.schedule ? (
                  <Skeleton className="h-96 w-full" />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border p-2 bg-gray-50"></th>
                          <th className="border p-2 bg-gray-50">08:00 - 09:30</th>
                          <th className="border p-2 bg-gray-50">09:45 - 11:15</th>
                          <th className="border p-2 bg-gray-50">11:30 - 13:00</th>
                          <th className="border p-2 bg-gray-50">13:00 - 14:00</th>
                          <th className="border p-2 bg-gray-50">14:00 - 15:30</th>
                          <th className="border p-2 bg-gray-50">15:45 - 17:15</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule?.days.map((day, dayIndex) => (
                          <tr key={dayIndex}>
                            <td className="border p-2 font-medium bg-gray-50">{day.day}</td>
                            {day.slots.map((slot, slotIndex) => (
                              <td
                                key={slotIndex}
                                className={`border p-2 ${slot.course ? `bg-${slot.course.color}-50` : ""}`}
                              >
                                {slot.course && (
                                  <>
                                    <div className="font-medium">{slot.course.title}</div>
                                    <div className="text-xs">
                                      {slot.course.type}
                                      {slot.course.room ? ` - Salle ${slot.course.room}` : ""}
                                    </div>
                                  </>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <Button variant="outline">Semaine précédente</Button>
                  <Button variant="outline">Semaine suivante</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Notes et résultats</h2>

                {loading.grades ? (
                  <div className="space-y-6">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-48 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Semestre en cours ({grades?.currentSemester.name})</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border p-2 text-left">Module</th>
                              <th className="border p-2 text-left">Code</th>
                              <th className="border p-2 text-left">Crédits</th>
                              <th className="border p-2 text-left">Contrôle continu</th>
                              <th className="border p-2 text-left">TP</th>
                              <th className="border p-2 text-left">Examen</th>
                              <th className="border p-2 text-left">Moyenne</th>
                              <th className="border p-2 text-left">Statut</th>
                            </tr>
                          </thead>
                          <tbody>
                            {grades?.currentSemester.modules.map((module) => (
                              <tr key={module.id} className="border-b">
                                <td className="border p-2">{module.name}</td>
                                <td className="border p-2">{module.code}</td>
                                <td className="border p-2">{module.credits}</td>
                                <td className="border p-2">
                                  {module.continuousAssessment !== null ? `${module.continuousAssessment}/20` : "-"}
                                </td>
                                <td className="border p-2">
                                  {module.practicalWork !== null ? `${module.practicalWork}/20` : "-"}
                                </td>
                                <td className="border p-2">{module.exam !== null ? `${module.exam}/20` : "-"}</td>
                                <td className="border p-2 font-medium">{module.average}/20</td>
                                <td className="border p-2">
                                  <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                                    {module.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Historique des semestres</h3>
                      <div className="space-y-4">
                        {grades?.history.map((semester) => (
                          <div key={semester.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Semestre {semester.name}</h4>
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                {semester.status}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Moyenne générale:</span>
                              <span className="font-medium">{semester.average}/20</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Crédits validés:</span>
                              <span className="font-medium">
                                {semester.credits}/{semester.totalCredits}
                              </span>
                            </div>
                            <div className="mt-2">
                              <Button size="sm" variant="outline">
                                Voir le détail
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Documents pédagogiques</h2>

                {loading.documents ? (
                  <div className="space-y-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Documents généraux</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {documents?.general.map((doc) => (
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
                              <Button size="sm" variant="link" className="p-0 h-auto mt-1">
                                Télécharger
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Documents par cours</h3>
                      <div className="space-y-4">
                        {documents?.courses.map((course) => (
                          <div key={course.id} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">{course.course}</h4>
                            <div className="space-y-2">
                              {course.files.map((file) => (
                                <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                  <div className="flex items-center gap-2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
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
                                    <span>{file.title}</span>
                                  </div>
                                  <Button size="sm" variant="ghost">
                                    Télécharger
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
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
