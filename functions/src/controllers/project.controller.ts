import { Request, Response } from "express";
import { db } from "../index";
import { Message } from "../interfaces/message";
import { Project } from "../interfaces/project.interface";
import { handleError } from "../interfaces/handler";
import { Contract } from "../interfaces/contract.interface";

const collection = "projects";

export async function createProject(request: Request, response: Response) {
  try {
    const newProject = Project(request.body);
    const idcontract = newProject.idcontract;
    //

    //
    const docContract = await db.collection("contracts").doc(idcontract).get();
    console.log(docContract);
    newProject.contract = Contract(docContract.data());
    const projectAdded = await db.collection(collection).add(newProject);
    return response
      .status(201)
      .json(
        Message(
          "Proyecto agregado",
          `Proyecto con id: ${projectAdded.id} agregado`,
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
    return response.status(200).json(Project(doc.data(), doc.id));
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

export async function countProject(request: Request, response: Response) {
  try {
    const snapshot = await db.collection(collection).get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listProject(request: Request, response: Response) {
  try {
    let limit = parseInt(request.params.limit);
    let page = parseInt(request.params.page);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("projectType")
      .offset(avoid)
      .get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Project(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listProjectContract(
  request: Request,
  response: Response
) {
  try {
    let idcontract = request.params.id;
    let page = parseInt(request.params.page);
    let limit = parseInt(request.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .where("idcontract", "==", idcontract)
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

export async function countProjectContract(
  request: Request,
  response: Response
) {
  try {
    const idcontract = request.params.id;
    let snapshot = await db
      .collection(collection)
      .where("idcontract", "==", idcontract)
      .get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listProjectsAll(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Project(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}

// funcion para obtener cantidad de un tipo de proyecto especifico
export async function countProjectType(request: Request, response: Response) {
  try {
    const snapshot = await db
      .collection(collection)
      .where("projectType", "==", "Construccion")
      .get();
    const snapshot2 = await db
      .collection(collection)
      .where("projectType", "==", "Alcantarillado")
      .get();
    const snapshot3 = await db
      .collection(collection)
      .where("projectType", "==", "Electricidad")
      .get();
    return response
      .status(200)
      .json({
        construccion: snapshot.size,
        alcantarillado: snapshot2.size,
        electricidad: snapshot3.size,
      });
  } catch (error) {
    return handleError(response, error);
  }
}
