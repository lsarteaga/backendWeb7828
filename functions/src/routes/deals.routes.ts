import { Application } from "express";
import { showDeals } from "../controllers/deals.controller";

export function dealsRoutes(app: Application) {
  app.get("/api/deals", showDeals);
}
