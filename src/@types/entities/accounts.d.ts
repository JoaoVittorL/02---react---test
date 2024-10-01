import { Base } from './Base';

export interface Account {
  id: string;
  name: string;
  cpf: string;
  email: string;
  status: string;
  type: string;
  base: {
    props: {
      baseName: string;
    };
  };
  contract: {
    props: {
      contractName: string;
    };
  };
}
