import { Registration } from "@/components/registration";
import { HardDrive } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormLoading } from "@/components/form-loading";
// import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from "@/components/ui/input";
// import { useBaseContractContext } from "@/contexts/use-base-contract";
// import { fetchMaterials } from "@/api/fetch-materials";

const schemaMaterials = z.object({
  code: z.string().min(1, { message: "Por favor, insira seu nome" }),
  description: z.string().min(1, { message: "Por favor, insira sua descrição" }),
  unit: z.string().min(1, { message: 'A uidade é obrigatória' }).refine(action => action !== 'Escolha', {
    message: 'Selecione uma unidade válida',
  }),
  type: z.string().min(1, { message: 'O tipo é obrigatório' }).refine(action => action !== 'Escolha', {
    message: 'Selecione um tipo válida',
  }),
  contractId: z.string().min(1, { message: 'Contrato obrigatório' }).refine(action => action !== 'Escolha', {
    message: 'Selecione um contrato válido',
  })
})

type FormData = z.infer<typeof schemaMaterials>;

export function Materials() {
  const [isLoading, setIsLoading] = useState(false);
  // const { baseOptions } = useBaseContractContext();
  const { handleSubmit, control, register, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schemaMaterials),
    mode: "all",
    defaultValues: {
      code: "",
      description: "",
      type: "Escolha",
      unit: "Escolha",
      contractId: "Escolha",
    },
  });

  const watchFields = watch(["code", "type", "description", "unit", "contractId"]);
  const isAnyFieldFilled = watchFields.every((field) => field !== "" && field !== "Escolha");

  const handleFormSubmit = useCallback(async (values: FormData) => {
    console.log(values)
    setIsLoading(true);
    // try {
    //   const body = {
    //     code: Number(values.code),
    //     type: values.type,
    //     description: values.description,
    //     unit: values.unit,
    //     contractId: values.contractId,
    //   }
    //   const response = await fetchMaterials(body);
    //   if (response.status === 201 || response.status === 200) {
    //     toast.success(response.data.message);
    //     reset();
    //   } else {
    //     toast.error(response.data.message || "Erro desconhecido.");
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    // } finally {
    //   setIsLoading(false);
    // }
  }, [reset]);
  const getInputClasses = (error?: string) => {
    return `border ${error ? 'border-red-500' : ''} rounded px-3 py-2 w-full`;
  };

  return (
    <>
      <Helmet title="Materials" />
      <Registration.Root>
        <Registration.Icon icon={HardDrive} />
        <Registration.Header
          title="Cadastrar novo material"
          coment="Preencha os campos abaixo para cadastrar um novo material"
        />
        <Registration.Form onSubmit={handleSubmit(handleFormSubmit)}>
          {isLoading && <FormLoading message="Cadastrando..." />}
          <Input placeholder="Código" type="text" {...register('code')} className={`h-8 ${getInputClasses(errors?.code?.message)}`} disabled={isLoading} />
          <Input placeholder="Descrição do material" type="text" {...register('description')} className={`h-8 ${getInputClasses(errors?.description?.message)}`} disabled={isLoading} />

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
                      <SelectItem value="FERRAGEM">FERRAGEM</SelectItem>
                      <SelectItem value="CONCRETO">CONCRETO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="unit"
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
                      <SelectItem value="Escolha">Medida</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="CM">CM</SelectItem>
                      <SelectItem value="LT">LT</SelectItem>
                      <SelectItem value="PCA">PCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="contractId"
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
                      <SelectItem value="Escolha">Contrato</SelectItem>
                      <SelectItem value="testes">testes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          <Registration.Actions>
            <Button
              type="submit"
              disabled={!isAnyFieldFilled || isLoading}
              variant={"default"}
              size={"xs"}
              className="w-full mt-4"
            >
              Cadastrar
            </Button>
          </Registration.Actions>
        </Registration.Form>
      </Registration.Root>
    </>
  )
}