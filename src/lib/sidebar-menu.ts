import {
  Activity,
  HandCoins,
  History,
  Package,
  SquarePen,
  Swords,
  BookUser,
  Construction,
  Pickaxe,
} from 'lucide-react';
type MenuItem = {
  id: string;
  label: string;
  icon: any;
  subMenu: { id: string; label: string; icon: any; link: string }[];
  link: string;
};
type MenuObject = {
  [key: string]: MenuItem[];
};
const objMenu: MenuObject = {
  Administrador: [
    {
      id: '1',
      label: 'Movimentação',
      icon: Activity,
      link: '/',
      subMenu: [],
    },
    {
      id: '2',
      label: 'Jogo entre projetos',
      icon: Swords,
      link: '/transfer',
      subMenu: [],
    },
    {
      id: '4',
      label: 'Orçamento',
      icon: HandCoins,
      link: '/budget',
      subMenu: [],
    },
    {
      id: '3',
      label: 'Criar ID',
      icon: Package,
      link: '/physical',
      subMenu: [],
    },
    {
      id: '5',
      label: 'Histórico',
      icon: History,
      link: '/historic',
      subMenu: [],
    },
    {
      id: '6',
      label: 'Gerenciar',
      icon: SquarePen,
      link: '/manage',
      subMenu: [
        { id: 'sub-1', label: 'Usuários', icon: BookUser, link: '/manage/accounts' },
        { id: 'sub-2', label: 'Obras', icon: Construction, link: '/manage/constructions' },
        { id: 'sub-3', label: 'Materiais', icon: Pickaxe, link: '/manage/materials' },
      ],
    },
  ],
  Storkeeper: [
    {
      id: 'movimentation',
      label: 'Movimentação',
      icon: Activity,
      link: '/movimentation',
      subMenu: [],
    },
  ],
  Estimator: [
    {
      id: 'movimentation',
      label: 'Movimentação',
      icon: Activity,
      link: '/movimentation',
      subMenu: [],
    },
  ],
} as const;
export const filterMenu = (token: string): MenuItem[] => {
  return objMenu[token];
};
