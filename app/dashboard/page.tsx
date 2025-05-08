import Banner from "@/components/banner"
import SidebarStudent from "@/components/sidebar-student"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Banner />
      <div className="flex flex-col md:flex-row"> {/* Stack on mobile, side-by-side on medium screens and up */}
        <div className="w-full md:w-auto"> {/* Full width on mobile, auto width on medium screens */}
          <SidebarStudent />
        </div>

                  <div className="flex-1 p-4"> {/* Add padding and make it fill remaining space */}
                     <div className="relative right-[80px]  w-full h-[350px] md:h-[750px]"> {/* Responsive container for image */}
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
