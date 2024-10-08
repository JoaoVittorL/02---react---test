import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MaterialMovimentation } from "@/@types/entities/material-movimentation";
import { useEffect, useState } from "react";

interface TableProps {
  data: MaterialMovimentation[];
  typeOfMovimentation: string;
}

export default function MovimentationTable({ data: initialData, typeOfMovimentation }: TableProps) {
  const [data, setData] = useState<MaterialMovimentation[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<boolean[]>(Array(initialData.length).fill(false));
  const [allSelected, setAllSelected] = useState<boolean>(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const isRowDisabled = (row: MaterialMovimentation) => {
    return (typeOfMovimentation === "Saída" || typeOfMovimentation === "Devolução") && row.value_movimentation === 0;
  };

  const handleInputChange = (index: number, field: keyof MaterialMovimentation, value: string | number) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      if (field === 'to_send') {
        updatedData[index].to_send = Number(value);
        updatedData[index].dispatch = value !== '0';
        setSelectedRows((prevSelection) => {
          const newSelection = [...prevSelection];
          newSelection[index] = Number(value) !== 0;
          return newSelection;
        });
      } else if (field === 'observation') {
        updatedData[index].observation = String(value);
      }
      return updatedData;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    const updatedSelection = data.map((_, index) => !isRowDisabled(data[index]) && checked);
    setSelectedRows(updatedSelection);

    const newToSendValue = checked ? data.map((row) => (!isRowDisabled(row) ? row.not_sended : 0)) : Array(data.length).fill(0);
    newToSendValue.forEach((value, index) => handleInputChange(index, 'to_send', value));
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const updatedSelection = [...selectedRows];
    updatedSelection[index] = checked;
    setSelectedRows(updatedSelection);

    const valueToSend = checked ? data[index].value_budget - data[index].value_movimentation : 0;
    handleInputChange(index, 'to_send', valueToSend);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {['Projeto', 'Código', 'Descrição', 'Medida', 'Orçado', 'Enviado', 'Falta enviar', 'Obs', 'Saída'].map((header, index) => (
            <TableHead key={index} className="text-center">{header}</TableHead>
          ))}
          <TableHead className="text-center w-[40px]">
            <Checkbox checked={allSelected} onCheckedChange={handleSelectAll} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell className="text-center">{row.project.project_number}</TableCell>
            <TableCell className="text-center">{row.material.code}</TableCell>
            <TableCell className="text-center">{row.material.description}</TableCell>
            <TableCell className="text-center">{row.material.unit}</TableCell>
            <TableCell className="text-center">{row.value_budget}</TableCell>
            <TableCell className="text-center">{row.value_movimentation}</TableCell>
            <TableCell className="text-center">{row.not_sended}</TableCell>
            <TableCell className="text-center">
              <Input className="w-full bg-transparent text-center" value={row.observation || ""} onChange={(e) => handleInputChange(index, 'observation', e.target.value.toUpperCase())} />
            </TableCell>
            <TableCell className="text-center">
              <Input className="w-full bg-transparent text-center" type="number" value={row.to_send || 0} onChange={(e) => handleInputChange(index, 'to_send', e.target.value)} />
            </TableCell>
            <TableCell className="text-center">
              <Checkbox checked={selectedRows[index]} onCheckedChange={(checked: boolean) => handleSelectRow(index, checked)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
