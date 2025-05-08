import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-auto">
          <SidebarStudent />
        </div>

             <main className="flex-1 p-4 overflow-hidden">
             <div className="relative md:right-20 w-full h-[400px] md:h-[600px] lg:h-[700px] max-w-[1200px] mx-auto">
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
