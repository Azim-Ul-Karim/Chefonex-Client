import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import RootLayout from './Layouts/RootLayout'
import { router } from './Routes/Routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <RootLayout></RootLayout>
    </RouterProvider>
  </StrictMode>
)