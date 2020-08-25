import { Request, Response } from "express";
import { db } from "../index";
import { Message } from "../interfaces/message";
import { Project } from "../interfaces/project.interface";
import { Employee } from "../interfaces/employee.interface";
import { Client } from "../interfaces/client.interface";
import { handleError } from "../interfaces/handler";

const collection = "projects";

export async function createProject(request: Request, response: Response) {
  try {
    const newProject = Project(request.body);
    const idemployee = newProject.idemployee;
    const idclient = newProject.idclient;
    const docEmployee = await db.collection("employees").doc(idemployee).get();
    const docClient = await db.collection("clients").doc(idclient).get();
    newProject.employee = Employee(docEmployee.data(), idemployee);
    newProject.client = Client(docClient.data(), idclient);
    const projectAdded = await db.collection(collection).add(newProject);
    return response
      .status(201)
      .json(
        Message(
          "Proyecto agregado",
          `Proyecto con id: ${projectAdded.id}`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}
export async function retrieveProject(request: Request, response: Response) {
  try {
    const doc = await db.collection(collection).doc(request.params.id).get();
    if (!doc) {
      return response
        .status(404)
        .json(
          Message(
            "Proyecto no encontrado",
            `Proyecto con id: ${request.params.id} no encontrado`,
            "warning"
          )
        );
    }
    return response.status(200).json(Project(doc, doc.id));
  } catch (error) {
    return handleError(response, error);
  }
}
export async function updateProject(request: Request, response: Response) {
  try {
    const projectToUpdate = Project(request.body);
    await db
      .collection(collection)
      .doc(request.params.id)
      .set(projectToUpdate, { merge: true });
    return response
      .status(200)
      .json(
        Message(
          "Proyecto actualizado",
          `Proyecto con id: ${request.params.id} actualizado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}
export async function deleteProject(request: Request, response: Response) {
  try {
    await db.collection(collection).doc(request.params.id).delete();
    return response
      .status(200)
      .json(
        Message(
          "Proyecto eliminado",
          `Proyecto con id: ${request.params.id} eliminado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}
export async function listProject(request: Request, response: Response) {
  try {
    let page = parseInt(request.params.page);
    let limit = parseInt(request.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("kind")
      .offset(avoid)
      .limit(limit)
      .get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Project(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}
export async function countProject(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}
