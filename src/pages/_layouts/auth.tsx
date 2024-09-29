import { Outlet } from 'react-router-dom'

import BackgroundImage from '../../assets/background.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen sm:grid-cols-[1fr_3fr]">
      <div className="mx-auto flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <div className="hidden max-h-screen bg-muted sm:block">
        <img
          src={BackgroundImage}
          alt=""
          className="h-full w-full object-cover brightness-50"
        />
      </div>
    </div>
  )
}
