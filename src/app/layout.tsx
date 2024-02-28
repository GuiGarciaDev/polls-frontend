import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import QueryNextClientProvider from "@/context/queryClientProvider"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"

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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex justify-center h-screen">
              <ThemeSwitcher />
              <div className="flex max-w-screen-2xl grow">{children}</div>
            </div>
          </ThemeProvider>
          <Toaster />
        </QueryNextClientProvider>
      </body>
    </html>
  )
}
