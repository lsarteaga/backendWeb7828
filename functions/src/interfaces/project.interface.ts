import { EmployeeInterface } from "./employee.interface";
import { AdvanceInterface } from "./advance.interface";
import { ContractInterface } from "./contract.interface";

export interface ProjectInterface {
  idproject?: string;
  address: string;
  status: string;
  description: string;
  projectType: string;
  employees: Array<EmployeeInterface>;
  advances: Array<AdvanceInterface>;
  idcontract: string;
  contract?: ContractInterface;
}

export function Project(data: any, id?: string) {
  const {
    address,
    status,
    description,
    projectType,
    employees,
    advances,
    idcontract,
    contract,
  } = data;
  let object: ProjectInterface = {
    idproject: id,
    address: address,
    status: status,
    description: description,
    projectType: projectType,
    employees: employees,
    advances: advances,
    idcontract: idcontract,
    contract: contract,
  };
  return object;
}
