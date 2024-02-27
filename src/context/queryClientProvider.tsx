"use client"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

interface QueryNextClientProviderProps {
  children: ReactNode
}

export default function QueryNextClientProvider({
  children,
}: QueryNextClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
