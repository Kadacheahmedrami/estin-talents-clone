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
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6 pt-16 md:pt-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Architecture des études</h1>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="relative w-full h-[250px] md:h-[500px]">
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

            <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
              {loading
                ? Array(2)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-6 md:h-8 w-48 md:w-64 mb-2" />
                        <Skeleton className="h-16 md:h-20 w-full mb-2" />
                        <div className="mt-2 space-y-1">
                          <Skeleton className="h-4 md:h-5 w-full" />
                          <Skeleton className="h-4 md:h-5 w-full" />
                        </div>
                      </div>
                    ))
                : data?.sections.map((section, index) => (
                    <div key={index}>
                      <h2 className="text-lg md:text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-sm md:text-base text-gray-700">{section.description}</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-sm md:text-base text-gray-700">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-2">Spécialisations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {loading
                    ? Array(2)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index} className="border rounded-lg p-3 md:p-4 bg-teal-50">
                            <Skeleton className="h-5 md:h-6 w-3/4 mb-2" />
                            <Skeleton className="h-12 md:h-16 w-full" />
                          </div>
                        ))
                    : data?.specializations.map((spec, index) => (
                        <div key={index} className="border rounded-lg p-3 md:p-4 bg-teal-50">
                          <h3 className="font-medium text-base md:text-lg mb-1 md:mb-2 text-teal-700">{spec.title}</h3>
                          <p className="text-sm md:text-base text-gray-700">{spec.description}</p>
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
