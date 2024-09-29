import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'

export function Movimentation() {
  return (
    <>
      <Helmet title="Movimentation" />
      <div className='flex itens-center gap-2 justify-center'>
        <h1>Movimentation</h1>
        <Button variant="default">Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="ghost">Button</Button>
      </div>
    </>
  )
}
