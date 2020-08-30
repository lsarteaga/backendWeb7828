import { Application } from "express";
import {
  createClient,
  retrieveClient,
  updateClient,
  countClient,
  deleteClient,
  listClient,
  listClientAll,
} from "../controllers/client.controller";

export function clientRoutes(app: Application) {
  app.post("/api/clients", createClient);
  app.get("/api/clients/:id", retrieveClient);
  app.put("/api/clients/:id", updateClient);
  app.delete("/api/clients/:id", deleteClient);
  app.get("/api/page/clients/:page/:limit", listClient);
  app.get("/api/count/clients", countClient);
  app.get("/api/clients/list", listClientAll);
}
