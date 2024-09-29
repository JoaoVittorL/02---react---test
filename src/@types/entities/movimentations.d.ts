import { Base } from './Base';
import { Material } from './Material';
import { Project } from './Project';
import { User } from './User';

export interface Movimentation {
  id: string;
  createdAt: string;
  observation: string;
  value: number;
  base: Base;
  user: User;
  project: Project;
  material: Material;
}
