import type React from "react"
import type { Metadata } from "next"



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
