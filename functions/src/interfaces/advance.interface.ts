import { Employee, EmployeeInterface } from "./employee.interface";

export interface AdvanceInterface {
  idadvance?: string;
  description: string;
  date: string;
  idemployee: string;
  employee?: EmployeeInterface;
}

export function Advance(data: any, id?: string) {
  const { description, date, idemployee } = data;
  let object: AdvanceInterface = {
    idadvance: id,
    description: description,
    date: date,
    idemployee: idemployee,
    employee: Employee(data.employee, data.employee.id),
  };
  return object;
}
