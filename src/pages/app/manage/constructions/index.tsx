import { Registration } from "@/components/registration";
import { toast } from "sonner";
import { HardHat } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLoading } from "@/components/form-loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useBaseContractContext } from "@/contexts/use-base-contract";
// import { fetchConstructions } from "@/api/fetch-contructions";

const schemaConstructions = z.object({
  project_number: z.string().min(6, { message: "Por favor, insira uam obra" }).max(20, { message: "Por favor, insira um projeto" }),
  description: z.string().min(6, { message: "Por favor, insira sua descrição" }),
  type: z.string().min(1, { message: 'A uidade é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma unidade válida',
  }),
  city: z.string().min(1, { message: 'A cidade é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma cidade válida',
  }),
})

type FormData = z.infer<typeof schemaConstructions>;

export function Constructions() {
  // const { baseOptions } = useBaseContractContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, watch, reset, register, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaConstructions),
    mode: "all",
    defaultValues: {
      project_number: "",
      description: "",
      type: "Escolha",
      city: "Escolha",
    },
  });

  const watchFields = watch(["project_number", "description", "type", "city"]);
  const isAnyFieldFilled = watchFields.every((field) => field !== "" && field !== "Escolha");

  const handleFormSubmit = useCallback(async (values: FormData) => {
    console.log(values);
    toast.success('Pode enviar!')
    // setIsLoading(true);
    // const response = await fetchConstructions(values);
    // if (response.status === 201 || response.status === 200) {
    //   toast.success(response.message);
    //   reset();
    // } else {
    //   toast.error(response.message || "Erro desconhecido.");
    // }
    // setIsLoading(false);
  }, [reset]);

  const getInputClasses = (error?: string) => {
    return `border ${error ? 'border-red-500' : ''} rounded px-3 py-2 w-full`;
  };

  return (
    <>
      <Helmet title="Constructions" />
      <Registration.Root>
        <Registration.Icon icon={HardHat} />
        <Registration.Header title="Cadastrar nova obra" coment="Preencha os campos abaixo para cadastrar uma nova obra" />
        <Registration.Form onSubmit={handleSubmit(handleFormSubmit)}>
          {isLoading && <FormLoading message="Inserindo projeto..." />}
          <Input placeholder="Projeto" type="text" {...register('project_number')} className={`h-8 ${getInputClasses(errors?.project_number?.message)}`} disabled={isLoading} />
          <Input placeholder="Descrição da obra" type="text" {...register('description')} className={`h-8 ${getInputClasses(errors?.description?.message)}`} disabled={isLoading} />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <Controller
              name="type"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    defaultValue="all"
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos status</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                      <SelectItem value="processing">Em preparo</SelectItem>
                      <SelectItem value="delivering">Em entrega</SelectItem>
                      <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            ></Controller>
            <Controller
              name="city"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <Select
                    defaultValue="all"
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger className="h-8 w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos status</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="canceled">Cancelado</SelectItem>
                      <SelectItem value="processing">Em preparo</SelectItem>
                      <SelectItem value="delivering">Em entrega</SelectItem>
                      <SelectItem value="delivered">Entregue</SelectItem>
                    </SelectContent>
                  </Select>
                )
              }}
            ></Controller>
          </div>
          <Registration.Actions>
            <Button type="submit" disabled={!isAnyFieldFilled || isLoading} variant="default" size={"xs"} id="submit" className="w-full mt-4">
              Cadastrar
            </Button>
          </Registration.Actions>
        </Registration.Form >
      </Registration.Root >
    </>
  )
}