import { singUp } from "../controllers/auth.controller";
import { Application } from "express";

export async function authRoutes(app: Application) {
  app.post("/api/auth/signup", singUp);
}
