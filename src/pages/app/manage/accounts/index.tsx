import { Helmet } from "react-helmet-async";
import { AccountsTableFilter } from "../../historic/accounts-table-filter";
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
import { getAccounts } from "@/api/fetch-accounts";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/pagination";
import { useCallback, useState } from "react";
import EditAccount from "./account-edit";
import { AccountsTableRow } from "../../historic/account-table-row";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { CreateNewAccount } from "./account-create";

export function Accounts() {
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
  const [isAsidebarOpen, setAsidebarOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const openAsidebar = useCallback((account: any) => {
    setSelectedAccount(account);
    setAsidebarOpen(true);
  }, []);
  const closeAsidebar = useCallback(() => {
    setAsidebarOpen(false);
    setSelectedAccount(null);
  }, []);

  const handleUpdateData = () => {
    console.log('Estou atualizando contas')
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
              <CreateNewAccount handleUpdateData={handleUpdateData} />
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
              <TableHead className="text-center ">CPF</TableHead>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead className="text-center">Contrato</TableHead>
              <TableHead className="text-center">Base</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result && result.map((order) => (
              <AccountsTableRow key={order.cpf} order={order} onEdit={openAsidebar} />
            ))}
            <EditAccount isOpen={isAsidebarOpen} onClose={closeAsidebar} data={selectedAccount as any} />

          </TableBody>
        </Table>
      </div>
      {isLoading && <p className="text-center w-full mt-2 text-xl">Atualizando...</p>}
    </div>
  )
}