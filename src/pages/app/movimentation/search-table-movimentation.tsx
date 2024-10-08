import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SearchButtonsFilter } from "@/components/search-buttons-filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const schemaFilter = z.object({
  type: z.string().min(1, { message: 'Tipo obrigatório' }).refine(action => action !== 'Escolha', {
    message: 'Selecione o tipo',
  }),
  project_number: z.string().min(6, { message: "O projeto deve conter no mínimo 6 dígitos" }).max(20, { message: "O projeto deve conter no máximo 20 dígitos" }),
})
type OrderFiltersSchema = z.infer<typeof schemaFilter>

export function SearchTableMovimentation({ dataBugdet, setTypeOfMovimentation }: { dataBugdet: string, setTypeOfMovimentation: (value: string) => void }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const projectFromURL = searchParams.get('project');

  const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(schemaFilter),
    defaultValues: {
      type: 'Escolha',
      project_number: projectFromURL ?? '',
    },
  })

  const [project_number] = watch(['project_number']);
  const activeButtonInteraction = !!(project_number);

  function handleFilter({ project_number }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (project_number) {
        state.set('project_number', project_number.trim().toUpperCase());
      } else {
        state.delete('project_number');
      }

      return state
    })
  }
  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('project_number')
      return state
    })

    reset({ project_number: '' })
  }
  const getInputClasses = (error?: string) => {
    return `border ${error ? 'border-red-500' : ''} rounded px-3 py-2 w-full`;
  };
  const onError = () => {
    if (errors.project_number) {
      toast.error(errors.project_number.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFilter, onError)} className="flex items-center gap-2 justify-between mb-2" >
      <div className="flex itens-center gap-2">
        <Controller
          name="type"
          control={control}
          defaultValue="Escolha"
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <Select
                name={name}
                value={value || "Escolha"}
                onValueChange={(val) => {
                  setTypeOfMovimentation(val);
                  onChange(val);
                }}
                disabled={disabled}
              >
                <SelectTrigger className={`h-8 w-[180px] ${getInputClasses(errors?.type?.message)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Escolha">Tipo</SelectItem>
                  <SelectItem value="Saída">Saída</SelectItem>
                  <SelectItem value="Devolução">Devolução</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        >
        </Controller>
        <Input placeholder="Projeto..." autoComplete="off" type="text" {...register('project_number')} className={getInputClasses(errors?.project_number?.message)} />
        <Input type="text" placeholder="" autoComplete="off" disabled value={dataBugdet} />
      </div>
      <SearchButtonsFilter activeButtonInteraction={activeButtonInteraction} handleClearFilters={handleClearFilters} />
    </form >
  )
}