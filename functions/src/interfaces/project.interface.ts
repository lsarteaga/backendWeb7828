import { ClientInterface } from "./client.interface";
import { EmployeeInterface } from "./employee.interface";

export interface ProjectInterface {
  idproject?: string;
  kind: string;
  dateInit: Date;
  dateFinish: Date;
  direction: string;
  status: string;
  cost: number;
  description: string;
  idemployee: string;
  idclient: string;
  client?: ClientInterface;
  employee?: EmployeeInterface;
}

export function Project(data: any, id?: string) {
  const {
    kind,
    dateInit,
    dateFinish,
    direction,
    status,
    cost,
    description,
    idemployee,
    idclient,
  } = data;
  let object: ProjectInterface = {
    idproject: id,
    kind: kind,
    dateInit: dateInit,
    dateFinish: dateFinish,
    direction: direction,
    status: status,
    cost: cost,
    description: description,
    idemployee: idemployee,
    idclient: idclient,
  };
  return object;
}
