import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchButtonsFilter } from "@/components/search-buttons-filter";

const schemaFilter = z.object({
  name: z.string().optional(),
  baseId: z.string().optional(),
  contractId: z.string().optional(),
})

type OrderFiltersSchema = z.infer<typeof schemaFilter>

export function AccountsTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const projectNumberFromURL = searchParams.get('name');
  const contractIdFromURL = searchParams.get('contractId');
  const baseIdFromURL = searchParams.get('baseId');

  const { register, handleSubmit, watch, reset, control } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(schemaFilter),
    defaultValues: {
      name: projectNumberFromURL ?? '',
      contractId: contractIdFromURL ?? '',
      baseId: baseIdFromURL ?? '',
    },
  })

  const [name, contractId, baseId] = watch(['name', 'contractId', 'baseId']);
  const activeButtonInteraction = !!(name || contractId && contractId !== 'Escolha' || baseId && baseId !== 'Escolha');
  function handleFilter({ name, contractId, baseId }: OrderFiltersSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set('name', name.trim());
      } else {
        state.delete('name');
      }

      if (contractId && contractId !== 'Escolha') {
        state.set('contractId', contractId.trim());
      } else {
        state.delete('contractId');
      }

      if (baseId && baseId !== 'Escolha') {
        state.set('baseId', baseId.trim());
      } else {
        state.delete('baseId');
      }

      state.set('page', '1')

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('contractId')
      state.delete('baseId')
      state.set('page', '1')
      return state
    })

    reset({ name: '', contractId: '', baseId: '' })
  }

  const getInputClasses = (error?: string) => {
    return `border ${error ? 'border-red-500' : ''} rounded px-3 py-2 w-full`;
  };

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <div className="flex items-center gap-2 w-full">
        <Input
          placeholder="Digite o nome..."
          type="text"
          {...register('name')}
          className="min-w-[300px] flex-1 sm:min-w-[250px] md:min-w-[300px]"
        />
        <Controller
          name="contractId"
          control={control}
          defaultValue="Escolha"
          render={({ field: { name, onChange, value }, fieldState: { error } }) => (
            <div className="min-w-[180px] flex-1">
              <Select
                name={name}
                onValueChange={onChange}
                value={value || 'Escolha'}
              >
                <SelectTrigger className={`h-8 ${getInputClasses(error?.message)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Escolha">Contrato</SelectItem>
                  <SelectItem value="ITABERABA">ITABERABA</SelectItem>
                  <SelectItem value="IRECÊ">IRECÊ</SelectItem>
                  <SelectItem value="SANTA MARIA">SANTA MARIA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          name="baseId"
          defaultValue="Escolha"
          control={control}
          render={({ field: { name, onChange, value }, fieldState: { error } }) => (
            <div className="min-w-[180px] flex-1">
              <Select
                name={name}
                onValueChange={onChange}
                value={value || 'Escolha'}
              >
                <SelectTrigger className={`h-8 ${getInputClasses(error?.message)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Escolha">Base</SelectItem>
                  <SelectItem value="ITABERABA">ITABERABA</SelectItem>
                  <SelectItem value="IRECÊ">IRECÊ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
      <SearchButtonsFilter
        activeButtonInteraction={activeButtonInteraction}
        handleClearFilters={handleClearFilters}
      />
    </form>
  )
}