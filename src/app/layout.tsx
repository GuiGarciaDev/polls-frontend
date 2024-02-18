import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryNextClientProvider from "@/context/queryClientProvider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Polls",
  description: "Nlw polls front end",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryNextClientProvider>
          <div className="flex justify-center h-screen">
            <div className="flex max-w-screen-2xl grow p-6">{children}</div>
          </div>
          <Toaster />
        </QueryNextClientProvider>
      </body>
    </html>
  )
}
