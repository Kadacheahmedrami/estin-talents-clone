"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface ArchitectureData {
  image: string
  sections: {
    title: string
    description: string
    items: string[]
  }[]
  specializations: {
    title: string
    description: string
  }[]
}

export default function ArchitecturePage() {
  const [data, setData] = useState<ArchitectureData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/architecture")
        const architectureData = await response.json()
        setData(architectureData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching architecture data:", error)
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
          <h1 className="text-3xl font-bold mb-6">Architecture des études</h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="relative w-full h-[500px]">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <Image
                  src={data?.image || "/images/architecture-etudes.png"}
                  alt="Architecture des études"
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="mt-8 space-y-6">
              {loading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-8 w-64 mb-2" />
                        <Skeleton className="h-20 w-full mb-2" />
                        <div className="mt-2 space-y-1">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                      </div>
                    ))
                : data?.sections.map((section, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-gray-700">{section.description}</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

              <div>
                <h2 className="text-xl font-semibold mb-2">Spécialisations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {loading
                    ? Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-teal-50">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-16 w-full" />
                          </div>
                        ))
                    : data?.specializations.map((spec, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-teal-50">
                          <h3 className="font-medium text-lg mb-2 text-teal-700">{spec.title}</h3>
                          <p className="text-gray-700">{spec.description}</p>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
