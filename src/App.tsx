import './style/index.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'
export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="eco-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s - ECO" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}
