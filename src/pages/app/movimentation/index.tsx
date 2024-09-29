import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'

export function Movimentation() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className='flex itens-center gap-2 justify-center'>
        <h1>Dashboard</h1>
        <Button variant="default">Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    </>
  )
}
