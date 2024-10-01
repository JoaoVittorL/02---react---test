import data from './data.json'

export interface getQueryType {
  page?: number | null;
  name?: string | null;
  contractId?: string | null;
  baseId?: string | null;
}

export async function getAccounts({ name, contractId, baseId, page }: getQueryType) {
  console.log({ name, contractId, baseId, page })
  await new Promise((resolve) => setTimeout(resolve, 10000))
  const response = await data
  return response
}
export function createAccount() {
  console.log('Estou criando usuário')
}

export function updateAccount() {
  console.log('Estou atualizando contas')
}