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

export function contractRoutes(app: Application) {
  app.post("/api/contracts", createContract);
  app.get("/api/contracts/:id", retrieveContract);
  app.put("/api/contracts/:id", updateContract);
  app.delete("/api/contracts/:id", deleteContract);
  app.get("/api/count/contracts", countContract);
  app.get("/api/page/contracts/:page/:limit", listContract);
  app.get("/api/employee/contracts/:id/:page/:limit", listContractEmloyee);
  app.get("/api/employee/count/contracts/:id/", countContractEmployee);
}
