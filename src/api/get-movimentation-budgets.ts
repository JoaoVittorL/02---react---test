import data from './data.json';

export async function getMovimentationsBudgets({ project_number }: { project_number: string | null }) {
  console.log(project_number);
  return data;
}
