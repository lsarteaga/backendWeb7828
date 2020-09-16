import { ClientInterface } from "./client.interface";
import { EmployeeInterface } from "./employee.interface";

export interface ContractInterface {
  idcontract?: string;
  cost: number;
  title: string;
  startDate: string;
  endDate: string;
  idemployee: string;
  idclient: string;
  client?: ClientInterface;
  contractor?: EmployeeInterface;
  created_by?: string;
  created_at: string;
}

export function Contract(data: any, id?: string, username?: string) {
  const {
    cost,
    title,
    startDate,
    endDate,
    idemployee,
    idclient,
    client,
    contractor,
  } = data;
  let object: ContractInterface = {
    idcontract: id,
    cost: cost,
    title: title,
    startDate: startDate,
    endDate: endDate,
    idemployee: idemployee,
    idclient: idclient,
    client: client,
    contractor: contractor,
    created_by: username,
    created_at: new Date().toUTCString(),
  };
  return object;
}
