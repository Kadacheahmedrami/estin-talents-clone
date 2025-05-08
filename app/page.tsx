"use client"

import Banner from "@/components/banner"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface HomeData {
  // Add the properties you need for your data
  id?: string;
  title?: string;
  // Add other properties as needed
}

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)

  // ... (keeping the useEffect and renderIcon functions the same)

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <div className="flex flex-grow">
        <Sidebar />
         <main className="flex-1 p-4 overflow-hidden">
               <div className="relative right-20 w-full h-[400px] md:h-[600px] lg:h-[700px] max-w-[1200px] mx-auto">
                 <Image
                 src="/architect.png"
                 alt="Dashboard"
                 fill
                 priority
                 className="object-contain"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                 />
               </div>
               </main>
      </div>
    </div>
  )
}
