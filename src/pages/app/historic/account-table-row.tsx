import { Movimentation } from "@/@types/entities/movimentations";
import {
  TableCell,
  TableRow,
} from '@/components/ui/table'


export const AccountsTableRow = ({ order }: { order: Movimentation }) => (
  <TableRow key={order.cpf}>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
    <TableCell className="text-center">{order.createdAt}</TableCell>
  </TableRow>
);