import Sidebar from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className='flex w-screen'>
      <Sidebar typeAcess="Administrador" />
      <div className="flex-1 overflow-y-auto relative h-screen p-2">
        <Outlet />
      </div>
    </div >
  )
}
