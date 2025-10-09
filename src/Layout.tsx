import Titulo from './components/Titulo.tsx'
import { Outlet } from 'react-router-dom'

import { Toaster } from 'sonner'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-800">
      <Titulo />
      <Outlet />
      <Toaster richColors position="top-center" />
    </div>
  )
}
