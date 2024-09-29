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
  subMenu?: { id: string; label: string; icon: any; link: string }[];
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
    },
    {
      id: '2',
      label: 'Jogo entre projetos',
      icon: Swords,
      link: '/transfer',
    },
    {
      id: '3',
      label: 'Orçamento',
      icon: HandCoins,
      link: '/budget',
    },
    {
      id: '4',
      label: 'Criar ID',
      icon: Package,
      link: '/physical',
    },
    {
      id: '5',
      label: 'Histórico',
      icon: History,
      link: '/historic',
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
  Almoxarifado: [
    {
      id: '1',
      label: 'Movimentação',
      icon: Activity,
      link: '/',
    },
    {
      id: '2',
      label: 'Jogo entre projetos',
      icon: Swords,
      link: '/transfer',
    },
    {
      id: '3',
      label: 'Orçamento',
      icon: HandCoins,
      link: '/budget',
    },
    {
      id: '4',
      label: 'Criar ID',
      icon: Package,
      link: '/physical',
    },
    {
      id: '5',
      label: 'Histórico',
      icon: History,
      link: '/historic',
    },
  ],
  Orcamentista: [
    {
      id: '1',
      label: 'Movimentação',
      icon: Activity,
      link: '/',
    },
    {
      id: '2',
      label: 'Jogo entre projetos',
      icon: Swords,
      link: '/transfer',
    },
    {
      id: '3',
      label: 'Orçamento',
      icon: HandCoins,
      link: '/budget',
    },
    {
      id: '4',
      label: 'Criar ID',
      icon: Package,
      link: '/physical',
    },
    {
      id: '5',
      label: 'Histórico',
      icon: History,
      link: '/historic',
    },
  ],
} as const;
export const filterMenu = (token: string): MenuItem[] => {
  return objMenu[token];
};
