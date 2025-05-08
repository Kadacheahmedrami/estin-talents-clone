"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface HomeData {
  about: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
  talents: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
  specializations: {
    title: string
    description: string
    icon: string
  }[]
  stats: {
    students: number
    professors: number
    partners: number
    graduationRate: number
  }
}

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/home")
        const homeData = await response.json()
        setData(homeData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching home data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    if (iconName === "brain-circuit") {
      return (
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
          className="text-teal-600"
        >
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M13 6h3a2 2 0 0 1 2 2v7" />
          <path d="M11 18H8a2 2 0 0 1-2-2V9" />
        </svg>
      )
    } else if (iconName === "shield-lock") {
      return (
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
          className="text-teal-600"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    }
    return null
  }

  return (
    <div>
      <Banner />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Bienvenue à ESTIN Talents</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {loading ? (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Skeleton className="h-7 w-3/4 mb-4" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Skeleton className="h-7 w-3/4 mb-4" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">{data?.about.title}</h2>
                    <p className="text-gray-700 mb-4">{data?.about.description}</p>
                    <Link href={data?.about.buttonLink || "/programmes"}>
                      <Button>{data?.about.buttonText}</Button>
                    </Link>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">{data?.talents.title}</h2>
                    <p className="text-gray-700 mb-4">{data?.talents.description}</p>
                    <Link href={data?.talents.buttonLink || "/connexion"}>
                      <Button>{data?.talents.buttonText}</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Nos spécialisations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                  <>
                    <div className="border rounded-lg p-4 flex flex-col items-center">
                      <Skeleton className="w-16 h-16 rounded-full mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center">
                      <Skeleton className="w-16 h-16 rounded-full mb-2" />
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                  </>
                ) : (
                  data?.specializations.map((spec, index) => (
                    <div key={index} className="border rounded-lg p-4 flex flex-col items-center">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                        {renderIcon(spec.icon)}
                      </div>
                      <h3 className="font-medium text-lg">{spec.title}</h3>
                      <p className="text-gray-600 text-center mt-2">{spec.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
