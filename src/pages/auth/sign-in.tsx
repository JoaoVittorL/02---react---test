import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosedIcon } from '@radix-ui/react-icons'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import LogoEco from '../../assets/logo.svg'

export const schemaLogin = z.object({
  email: z
    .string()
    .min(1, { message: 'Por favor, insira seu e-mail' })
    .email({ message: 'Por favor, insira um e-mail válido' })
    .refine((email) => email.endsWith('@ecoeletrica.com.br'), {
      message: 'O e-mail deve ser um endereço ecoelétrica',
    }),
  password: z.string().min(1, { message: 'Por favor, insira sua senha' }),
})
type FormData = z.infer<typeof schemaLogin>

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmitForm = (values: FormData) => {
    console.log(values)
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[340px] flex-col justify-center gap-4">
          <img src={LogoEco} alt="" className="mx-auto" />
          <h1 className="text-center text-lg font-semibold tracking-tight">
            Bem vindo(a)!
          </h1>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-2"
          >
            <div className="space-y-2">
              <Input type="email" placeholder="Email" {...register('email')} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <div className="flex items-center rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  {...register('password')}
                  className="w-full border-none bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:no-underline"
                />
                <button
                  className="px-3"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye /> : <EyeClosedIcon />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button variant={'default'} className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
