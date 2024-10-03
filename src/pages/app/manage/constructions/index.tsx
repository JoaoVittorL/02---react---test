import { Registration } from "@/components/registration";
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
  city: z.string().min(1, { message: 'A uidade é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma unidade válida',
  }),
  type: z.string().min(1, { message: 'A uidade é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma unidade válida',
  }),
  baseId: z.string().min(1, { message: 'A base é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma base válida',
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
      baseId: "Escolha",
    },
  });

  const watchFields = watch(["project_number", "type", "description", "city", "baseId"]);
  const isAnyFieldFilled = watchFields.every((field) => field !== "" && field !== "Escolha");

  const handleFormSubmit = useCallback(async (values: FormData) => {
    setIsLoading(true);
    console.log(values);
    // const response = await fetchConstructions(values);
    // if (response.status === 201 || response.status === 200) {
    //   toast.success(response.message);
    //   reset();
    // } else {
    //   toast.error(response.message || "Erro desconhecido.");
    // }
    setIsLoading(false);
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
              defaultValue="Escolha"
              render={({ field: { name, onChange, value }, fieldState: { error } }) => (
                <div className="flex-1 w-full">
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
                      <SelectItem value="Escolha">Tipo</SelectItem>
                      <SelectItem value="OC">OC</SelectItem>
                      <SelectItem value="OS">OS</SelectItem>
                      <SelectItem value="OBRA">OBRA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="baseId"
              control={control}
              defaultValue="Escolha"
              render={({ field: { name, onChange, value }, fieldState: { error } }) => (
                <div className="flex-1 w-full">
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
                      <SelectItem value="Escolha">Base</SelectItem>
                      <SelectItem value="1">Base 1</SelectItem>
                      <SelectItem value="2">Base 2</SelectItem>
                      <SelectItem value="3">Base 3</SelectItem>
                      {/* {baseOptions[0].map((base) => (
                        <SelectItem key={base.value} value={base.value}>{base.label}</SelectItem>
                      ))} */}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue="Escolha"
              render={({ field: { name, onChange, value }, fieldState: { error } }) => (
                <div className="flex-1 w-full">
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
                      <SelectItem value="Escolha">Cidade</SelectItem>
                      <SelectItem value="VITÓRIA DA CONQUISTA">VITÓRIA DA CONQUISTA</SelectItem>
                      <SelectItem value="ITABERABA">ITABERABA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
          <Registration.Actions>
            <Button type="submit" disabled={!isAnyFieldFilled || isLoading} variant="default" size={"xs"} id="submit" className="w-full mt-4">
              Cadastrar
            </Button>
          </Registration.Actions>
        </Registration.Form >
      </Registration.Root>
    </>
  )
}