import { Account } from "@/@types/entities/accounts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { MoreHorizontal } from "lucide-react";


export const AccountsTableRow = ({ order, onEdit }: { order: Account, onEdit: (order: Account) => void }) => (
  <TableRow key={order.cpf}>
    <TableCell className="text-center">{order.cpf}</TableCell>
    <TableCell className="text-center">{order.name}</TableCell>
    <TableCell className="text-center">{order.email}</TableCell>
    <TableCell className="text-center">{order.type}</TableCell>
    <TableCell className="text-center">{order.contract.props.contractName}</TableCell>
    <TableCell className="text-center">{order.base.props.baseName}</TableCell>
    <TableCell className="text-center">{order.status}</TableCell>
    <TableCell className="text-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0" aria-label="Opções de ações">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(order)}>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);