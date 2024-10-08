import { Material } from './Material';
import { Project } from './Project';
import * as z from 'zod';

interface MaterialMovimentation {
  id: string;
  createdAt: string;
  project: Project;
  material: Material;
  value_budget: number;
  value_movimentation: number;
  not_sended: number;
  observation: string;
  to_send: number;
  dispatch: boolean;
}

export interface MovimentationData {
  movimentation: Array<MaterialMovimentation>;
  addon?: Array<MaterialMovimentation>;
}

export const MaterialMovimentationSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  project: z.object({
    id: z.string(),
    project_number: z.string(),
    description: z.string(),
    city: z.string(),
  }),
  material: z.object({
    id: z.string(),
    code: z.number(),
    description: z.string(),
    unit: z.string(),
    type: z.string(),
  }),
  value_budget: z.number(),
  value_movimentation: z.number(),
  not_sended: z.number(),
  observation: z.string(),
  to_send: z.number(),
  dispatch: z.boolean(),
});