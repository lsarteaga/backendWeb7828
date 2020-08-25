import { EmployeeInterface } from "./employee.interface";

export interface AdvanceInterface {
  idadvance?: string;
  description: string;
  date: string;
  idemployee: string;
  employee?: EmployeeInterface;
}
