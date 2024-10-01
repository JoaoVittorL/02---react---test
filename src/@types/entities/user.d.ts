import { Base } from './Base';

export interface User {
  base: Base;
  cpf: string;
  email: string;
  id: string;
  name: string;
  status: string;
  type: string;
  contract: {
    props: {
      contractName: string;
    };
    _id: {
      value: string;
    };
  };
}

export interface UserInfos {
  id: string;
  name: string;
  email: string;
}
