import './style/index.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './rotes/routes'
import { ThemeProvider } from './components/theme/theme-provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
export function App() {
  return (

    <ThemeProvider defaultTheme="dark" storageKey="eco-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s - ECO" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}
