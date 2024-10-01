import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { AccountsTableRow } from "./account-table-row";
import { getAccounts } from "@/api/historic/fetch-accounts";
import { AccountsTableFilter } from "./accounts-table-filter";
import { OrderDetailsSkeleton } from "./account-skeleton";

export function Historic() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')
  const contractId = searchParams.get('contractId')
  const baseId = searchParams.get('baseId')

  const page = z.coerce.number().transform((page) => page).parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading } = useQuery({
    queryKey: ['accounts', name, contractId, baseId, , page],
    queryFn: () => getAccounts({
      name,
      contractId,
      baseId,
      page
    }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      if (pageIndex == 0) {
        state.set('page', (1).toString())
      } else {
        state.set('page', (pageIndex).toString())
      }

      return state
    })
  }


  return (
    <div>
      <Helmet title="Accounts" />
      <div className="flex items-center justify-between">
        <AccountsTableFilter />
        {result &&
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="xs"
                  variant={"default"}
                  className="flex gap-2 items-center">
                  <UserPlus />
                  Criar usuário
                </Button>
              </DialogTrigger>
            </Dialog>
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={page}
              totalCount={result?.length ?? 0}
              perPage={40}
            />
          </div>
        }
      </div>
      <div className="rounded-md border mx-auto w-full mt-2">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center ">Data</TableHead>
              <TableHead className="text-center">Projeto</TableHead>
              <TableHead className="text-center">Código</TableHead>
              <TableHead className="text-center">Descrição</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead className="text-center">Observações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result && result.map((order) => (
              <AccountsTableRow key={order.createdAt} order={order} />
            ))}
          </TableBody>
        </Table>
      </div>
      {isLoading && <OrderDetailsSkeleton />}
    </div>
  )
}