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
import { isAuthenticated, isAuthorized } from "../midlewares/midleware";

export function employeeRoutes(app: Application) {
  app.post("/api/employees", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "contractor"] }),
    createEmployee,
  ]);
  app.put("/api/employees/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["employee", "contractor", "admin"] }),
    updateEmployee,
  ]);
  app.get("/api/employees/:id", retrieveEmployee);
  app.delete("/api/employees/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "contractor"] }),
    deleteEmployee,
  ]);
  app.get("/api/count/employees", countEmployee);
  app.get("/api/page/employees/:page/:limit", listEmployee);
  app.get("/api/records/employees", listEmployeeAll);
}
