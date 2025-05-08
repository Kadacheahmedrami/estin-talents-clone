"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
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
                <div className="flex-1 p-4"> {/* Add padding and make it fill remaining space */}
                  <div className="relative md:right-[80px]  w-full h-[350px] md:h-[750px]"> {/* Responsive container for image */}
                    <Image
                      src="/architect.png"
                      alt="Dashboard"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
      </div>
    </div>
  )
}
