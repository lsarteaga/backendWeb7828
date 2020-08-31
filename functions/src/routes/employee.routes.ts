import { Application } from "express";
import {
  createEmployee,
  countEmployee,
  deleteEmployee,
  listEmployee,
  updateEmployee,
  retrieveEmployee,
  listEmployeeAll,
} from "../controllers/employee.controller";

export function employeeRoutes(app: Application) {
  app.post("/api/employees", createEmployee);
  app.put("/api/employees/:id", updateEmployee);
  app.get("/api/employees/:id", retrieveEmployee);
  app.delete("/api/employees/:id", deleteEmployee);
  app.get("/api/count/employees", countEmployee);
  app.get("/api/page/employees/:page/:limit", listEmployee);
  app.get("/api/records/employees", listEmployeeAll);
}
