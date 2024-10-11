import { useQuery } from "@tanstack/react-query";
import { SearchTableMovimentation } from "./search-table-movimentation";
import { getMovimentationsBudgets } from "@/api/get-movimentation-budgets";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "date-fns";
import type { MaterialMovimentation, MovimentationData } from '@/@types/entities/material-movimentation';
import MovimentationTable from "./table";
import { Project } from "@/@types/entities/Project";
import { Helmet } from "react-helmet-async";
import { Material } from "@/@types/entities/Material";

export default function Movimentation() {
  const [dataMovimentations, setDataMovimentations] = useState<MovimentationData>({
    addon: [], movimentation: []
  } as MovimentationData);

  const [searchParams] = useSearchParams();
  const project_number = searchParams.get('project_number');
  const [typeOfMovimentation, setTypeOfMovimentation] = useState("");

  const { data: result } = useQuery({
    queryKey: ['Movimentation', project_number],
    queryFn: () => getMovimentationsBudgets({
      project_number,
    }),
  });


  const getLastDateMovimentation = () => {
    if (!result?.movimentations || result.movimentations.length === 0) {
      return "";
    }
    const latestDate = result.movimentations.reduce((latest, item) => {
      return new Date(item.createdAt) > new Date(latest.createdAt) ? item : latest;
    }, result.movimentations[0]);

    return formatDate(latestDate.createdAt, "dd/MM/yyyy HH:mm:ss");
  }


  const getMovimentations = useCallback(async (project_number: string) => {
    if (!project_number) {
      return { addon: [], movimentation: [] };
    }

    try {
      const movimentationsList: Array<MaterialMovimentation> = [];
      const data = await getMovimentationsBudgets({ project_number });

      if (!data) {
        return { addon: [], movimentation: [] };
      }

      const aggregatedData: { [key: string]: MaterialMovimentation } = {};

      const generateKey = (project: Project, material: Material) =>
        `${project.id}-${material.id}`;

      // Processamento genérico para movimentações e budgets
      const processEntry = (entry: any, isMovimentation = false) => {
        const key = generateKey(entry.project, entry.material);

        if (!aggregatedData[key]) {
          aggregatedData[key] = {
            id: entry.id ?? '', // Pode ser de movimentação ou budget
            createdAt: entry.createdAt ?? '',
            project: entry.project,
            material: entry.material,
            value_budget: 0,
            value_movimentation: 0,
            not_sended: 0,
            observation: '',
            to_send: 0,
            dispatch: false,
          };
        }

        if (isMovimentation) {
          aggregatedData[key].value_movimentation += entry.value;
        } else {
          aggregatedData[key].value_budget += entry.value;
        }
      };

      // Processar movimentações
      data.movimentations.forEach((mov) => processEntry(mov, true));

      // Processar budgets
      data.budgets.forEach((budget) => processEntry(budget));

      // Agregar e calcular valores finais
      Object.values(aggregatedData).forEach((item) => {
        item.not_sended = Number(item.value_budget) - Number(item.value_movimentation)
        movimentationsList.push(item);
      });

      return {
        addon: [],
        movimentation: movimentationsList.filter(
          (r) => r.value_budget !== 0 || r.value_movimentation !== 0
        ),
      };
    } catch (error) {
      return { addon: [], movimentation: [] };
    }
  }, []);

  async function handleGetMovimentations(project_number: string) {
    const result = await getMovimentations(project_number)
    setDataMovimentations(result)
  }
  useEffect(() => {
    if (project_number != '' && project_number != null) {
      getLastDateMovimentation()
      handleGetMovimentations(project_number)
    }
  }, [project_number])



  return (
    <div>
      <Helmet title="Movimentação" />
      <SearchTableMovimentation dataBugdet={getLastDateMovimentation()} setTypeOfMovimentation={setTypeOfMovimentation} />
      {result && <MovimentationTable data={dataMovimentations?.movimentation ? dataMovimentations?.movimentation : []} typeOfMovimentation={typeOfMovimentation} />}
    </div>
  );
}