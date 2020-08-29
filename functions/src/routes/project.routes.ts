import {
  createProject,
  deleteProject,
  countProject,
  listProject,
  retrieveProject,
  updateProject,
} from "../controllers/project.controller";
import { Application } from "express";

export function projectRoutes(app: Application) {
  app.post("/api/projects", createProject);
  app.get("/api/projects/:id", retrieveProject);
  app.put("/api/projects/:id", updateProject);
  app.delete("/api/projects/:id", deleteProject);
  app.get("/api/count/projects", countProject);
  app.get("/api/page/projects/:page/:limit", listProject);
}