'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const TanstackQueryContext = ({ children }: { children: React.ReactNode }) => {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <div>
        <ReactQueryDevtools />
      </div>
    </QueryClientProvider>
  )
}

export default TanstackQueryContext 
