import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ESTIN Talents",
  description: "École supérieure en sciences et technologies de l'informatique et du numérique",
  generator: "smart nigga enterprise",
  icons: {
    icon: "/favicon.ico",      // standard favicon
    shortcut: "/favicon.ico",  // for older browsers that look for shortcut icon
    apple: "/favicon.ico",     // if you want iOS to pick it up
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head />
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </div>
      </body>
    </html>
  )
}
