import { ClientInterface } from "./client.interface";
import { EmployeeInterface } from "./employee.interface";

export interface ContractInterface {
  idcontract?: string;
  cost: number;
  startDate: string;
  endDate: string;
  idemployee: string;
  idclient: string;
  client?: ClientInterface;
  contractor?: EmployeeInterface;
}

export function Contract(data: any, id?: string) {
  const {
    cost,
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
    startDate: startDate,
    endDate: endDate,
    idemployee: idemployee,
    idclient: idclient,
    client: client,
    contractor: contractor,
  };
  return object;
}
