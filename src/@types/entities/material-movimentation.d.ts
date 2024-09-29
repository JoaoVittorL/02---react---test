import { Material } from "./Material";
import { Project } from "./Project";

export interface MaterialMovimentation {
    id: string;
    createdAt: string;
    project: Project,
    material: Material,
    value_budget: number,
    value_movimentation: number,
    not_sended: number,
    observation: string,
    to_send: number,
    dispatch: boolean,
}