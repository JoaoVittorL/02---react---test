import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from "@/components/ui/input";
// import { useBaseContractContext } from "@/context/use-base-contract";

const schemaCreateUsers = z.object({
  name: z.string().min(1, { message: "Por favor, insira seu nome" }),
  email: z.string().min(1, { message: "Por favor, insira seu e-mail" }).email({ message: "Por favor, insira um e-mail válido" }).refine((email) => email.endsWith("@ecoeletrica.com.br"), {
    message: "O e-mail deve ser um endereço ecoelétrica",
  }),
  cpf: z.string().refine((cpf) => cpf.length === 11, { message: "Por favor, insira um CPF valido" }),
  type: z.string().min(1, { message: 'Tipo obrigatóriao' }).refine(action => action !== 'Escolha', {
    message: 'Selecione um tipo válida',
  }),
  baseId: z.string().min(1, { message: 'Base obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma base válida',
  }),
  contractId: z.string().min(1, { message: 'Contrato obrigatório' }).refine(action => action !== 'Escolha', {
    message: 'Selecione um contrato válido',
  }),
  password: z.string().min(6, { message: "Por favor, insira sua senha" }),
})
type FormData = z.infer<typeof schemaCreateUsers>;

interface CrudPhysicalDocumentProps {
  handleUpdateData: () => void
}

export function CreateNewAccount({ handleUpdateData }: CrudPhysicalDocumentProps) {
  // const { baseOptions } = useBaseContractContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaCreateUsers),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      type: "Escolha",
      baseId: "Escolha",
      contractId: "Escolha",
      password: "",
    },
  });

  const getInputClasses = (error?: string) => {
    return `border ${error ? 'border-red-500' : ''} rounded px-3 py-2 w-full`;
  };

  const handleFormSubmit = async (values: FormData) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
      const response = await fetch(`/api/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          cpf: values.cpf,
          type: values.type,
          baseId: values.baseId,
          contractId: values.contractId,
          password: values.password
        }),
      });
      const result = await response.json();

      if (result.status === 201 || result.status === 200) {
        toast.success(result.message);
        handleUpdateData();
        reset();
      } else {
        toast.error(result.message || "Erro desconhecido.");
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Criar usuário</DialogTitle>
        <DialogDescription>Informações para criar um usuário</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-4 my-2'>
        <Input placeholder="Nome do colaborador" type="text" {...register('name')} className={`h-8 ${getInputClasses(errors?.name?.message)}`} disabled={isLoading} />
        <Input placeholder="E-mail Eco" type="text" {...register('email')} className={`h-8 ${getInputClasses(errors?.email?.message)}`} disabled={isLoading} />
        <Input placeholder="CPF (somente números)" type="text" maxLength={11} {...register('cpf')} className={`h-8 ${getInputClasses(errors?.cpf?.message)}`} disabled={isLoading} />
        <div className="w-full flex justify-between items-center gap-2">
          <Controller
            name="baseId"
            control={control}
            render={({ field: { name, onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={isLoading}
                >
                  <SelectTrigger className={`w-[180px] h-8 ${getInputClasses(error?.message)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Escolha">Escolha</SelectItem>
                    <SelectItem value="Itaberaba">Itaberaba</SelectItem>
                    {/* {baseOptions[0].map((base) => (
                      <SelectItem key={base.value} value={base.value}>{base.label}</SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field: { name, onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={isLoading}
                >
                  <SelectTrigger className={`h-8 ${getInputClasses(error?.message)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Escolha">Escolha</SelectItem>
                    <SelectItem value="Administrador">ADMINISTRADOR</SelectItem>
                    <SelectItem value="Almoxarife">ALMOXARIFADO</SelectItem>
                    <SelectItem value="Orçamentista">ORÇAMENTISTA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name="contractId"
            control={control}
            render={({ field: { name, onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={isLoading}
                >
                  <SelectTrigger className={`h-8 ${getInputClasses(error?.message)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Escolha">Escolha</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    {/* {baseOptions[1].map((base) => (
                      <SelectItem key={base.value} value={base.value}>{base.label}</SelectItem>
                    ))} */}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
        <Input placeholder="Senha" type="text" {...register('password')} className={`h-8 ${getInputClasses(errors?.password?.message)}`} disabled={isLoading} />
        {errors.password && <p className="text-gray-600 text-center">{errors.password.message}</p>}
        <Button size="sm" variant="default" type="submit" title="Criar" disabled={isLoading}>{isLoading ? "Criando..." : "Criar"}</Button>
      </form>
    </DialogContent>
  )
}