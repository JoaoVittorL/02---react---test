import { Material } from "./Material";
import { Project } from "./Project";
import { User } from "./User";

export interface Budget {
  id: string;
  createdAt: string;
  value: number;
  contract: Contract;
  user: User;
  project: Project;
  material: Material;
  observation?: string;
}