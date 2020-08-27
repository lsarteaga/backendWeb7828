import {
  createContract,
  countContract,
  deleteContract,
  listContract,
  retrieveContract,
  updateContract,
} from "../controllers/contract.controller";
import { Application } from "express";

export function contractRoutes(app: Application) {
  app.post("/api/contracts", createContract);
  app.get("/api/contracts/:id", retrieveContract);
  app.put("/api/contracts/:id", updateContract);
  app.delete("/api/contracts/:id", deleteContract);
  app.get("/api/count/contracts", countContract);
  app.get("/api/page/contracts/:page/:limit", listContract);
}
