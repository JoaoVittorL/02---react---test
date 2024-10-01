// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
// import { Controller, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Input } from "@/components/ui/input";
import { Account } from "@/@types/entities/accounts";
// import { useBaseContractContext } from "@/context/use-base-contract";

// const schemaUpdateUser = z.object({
//   name: z.string().min(1, { message: "Por favor, insira seu nome" }),
//   email: z.string().min(1, { message: "Por favor, insira seu e-mail" })
//     .email({ message: "Por favor, insira um e-mail válido" })
//     .refine(email => email.endsWith("@ecoeletrica.com.br"), {
//       message: "O e-mail deve ser um endereço ecoelétrica",
//     }),
//   cpf: z.string().refine(cpf => cpf.length === 11, { message: "Por favor, insira um CPF válido" }),
//   type: z.string().min(1, { message: 'Tipo obrigatório' })
//     .refine(action => action !== 'Escolha', {
//       message: 'Selecione um tipo válido',
//     }),
//   baseId: z.string().min(1, { message: 'Base obrigatória' })
//     .refine(action => action !== 'Escolha', {
//       message: 'Selecione uma base válida',
//     }),
//   status: z.string().min(1, { message: 'Status obrigatório' })
//     .refine(action => action !== 'Escolha', {
//       message: 'Selecione um status válido',
//     }),
//   contractId: z.string().min(1, { message: 'Contrato obrigatório' })
//     .refine(action => action !== 'Escolha', {
//       message: 'Selecione um contrato válido',
//     }),
//   password: z.string().optional().refine(password => !password || password.length >= 6, {
//     message: "A senha deve ter pelo menos 6 dígitos",
//   }),
// });

// type FormData = z.infer<typeof schemaUpdateUser>;


const EditAccount = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: Account }) => {
  // const { baseOptions } = useBaseContractContext();
  console.log(data);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className={`fixed top-0 right-0 h-full w-1/3 bg-white-200 dark:bg-blue-800 shadow-lg transition-transform transform z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Atualizar informações</h2>
          <Button variant="outline" onClick={onClose} className="w-8" size="xs"  >
            <X className="h-8 w-8" />
          </Button>
        </div>
      </div >
    </>
  );
};

export default EditAccount;