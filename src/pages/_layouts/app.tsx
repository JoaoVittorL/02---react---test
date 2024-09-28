import Sidebar from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className='flex w-screen'>
      <Sidebar typeAcess="Administrador" />
      <div>
        <Outlet />
      </div>
    </div>
  )
}
