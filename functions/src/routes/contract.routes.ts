import {
  createContract,
  countContract,
  deleteContract,
  listContract,
  retrieveContract,
  updateContract,
  listContractEmloyee,
  countContractEmployee,
} from "../controllers/contract.controller";
import { Application } from "express";
import { isAuthenticated, isAuthorized } from "../midlewares/midleware";

export function contractRoutes(app: Application) {
  app.post(
    "/api/contracts",
    [isAuthenticated, isAuthorized({ hasRole: ["admin", "contractor"] })],
    createContract
  );
  app.get("/api/contracts/:id", retrieveContract);
  app.put(
    "/api/contracts/:id",
    [isAuthenticated, isAuthorized({ hasRole: ["admin", "contractor"] })],
    updateContract
  );
  app.delete(
    "/api/contracts/:id",
    [isAuthenticated, isAuthorized({ hasRole: ["admin"] })],
    deleteContract
  );
  app.get("/api/count/contracts", countContract);
  app.get("/api/page/contracts/:page/:limit", listContract);
  app.get("/api/employee/contracts/:id/:page/:limit", listContractEmloyee);
  app.get("/api/employee/count/contracts/:id/", countContractEmployee);
}
