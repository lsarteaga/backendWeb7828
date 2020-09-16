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
import { isAuthenticated, isAuthorized } from "../midlewares/midleware";

export function clientRoutes(app: Application) {
  app.post("/api/clients", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "contractor"] }),
    createClient,
  ]);
  app.get("/api/clients/:id", retrieveClient);
  app.put("/api/clients/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin", "client"] }),
    updateClient,
  ]);
  app.delete("/api/clients/:id", [
    isAuthenticated,
    isAuthorized({ hasRole: ["admin"] }),
    deleteClient,
  ]);
  app.get("/api/page/clients/:page/:limit", listClient);
  app.get("/api/count/clients", countClient);
  app.get("/api/records/clients", listClientAll);
}
