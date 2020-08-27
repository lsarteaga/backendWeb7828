import {
  createAdvance,
  countAdvance,
  deleteAdvance,
  listAdvance,
  retrieveAdvance,
  updateAdvance,
} from "../controllers/advance.controller";
import { Application } from "express";

export function advanceRoutes(app: Application) {
  app.post("/api/advances", createAdvance);
  app.get("/api/advances/:id", retrieveAdvance);
  app.put("/api/advances/:id", updateAdvance);
  app.delete("/api/advances/:id", deleteAdvance);
  app.get("/api/count/advances", countAdvance);
  app.get("/api/page/advances/:page/:limit", listAdvance);
}
