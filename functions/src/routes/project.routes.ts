import {
  createProject,
  deleteProject,
  countProject,
  listProject,
  retrieveProject,
  updateProject,
  listProjectContract,
  countProjectContract,
} from "../controllers/project.controller";
import { Application } from "express";
import { isAuthenticated, isAuthorized } from "../midlewares/midleware";

export function projectRoutes(app: Application) {
  app.post(
    "/api/projects",
    [isAuthenticated, isAuthorized({ hasRole: ["admin", "contractor"] })],
    createProject
  );
  app.get("/api/projects/:id", retrieveProject);
  app.put(
    "/api/projects/:id",
    [isAuthenticated, isAuthorized({ hasRole: ["admin", "contractor"] })],
    updateProject
  );
  app.delete(
    "/api/projects/:id",
    [isAuthenticated, isAuthorized({ hasRole: ["admin", "contractor"] })],
    deleteProject
  );
  app.get("/api/count/projects", countProject);
  app.get("/api/page/projects/:page/:limit", listProject);
  app.get("/api/contract/projects/:id/:page/:limit", listProjectContract);
  app.get("/api/contract/count/projects/:id", countProjectContract);
}
