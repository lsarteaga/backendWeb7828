import { Response, Request } from "express";
import { db } from "../index";
import { Message } from "../interfaces/message";
import { handleError } from "../interfaces/handler";
import { Advance } from "../interfaces/advance.interface";
import { Employee } from "../interfaces/employee.interface";

const collection = "advances";

export async function createAdvance(request: Request, response: Response) {
  try {
    const newAdvance = Advance(request.body);
    const idemployee = newAdvance.idemployee;
    const docEmployee = await db.collection("employees").doc(idemployee).get();
    newAdvance.employee = Employee(docEmployee.data());
    const advanceAdded = await db.collection(collection).add(newAdvance);
    return response
      .status(201)
      .json(
        Message(
          "Avance creado",
          `Avance con id: ${advanceAdded.id} agregado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function retrieveAdvance(request: Request, response: Response) {
  try {
    const doc = await db.collection(collection).doc(request.params.id).get();
    if (!doc) {
      return response
        .status(404)
        .json(
          Message(
            "Avance no encontrado",
            `Avance con id: ${request.params.id} no encontrado`,
            "warning"
          )
        );
    }
    return response.status(200).json(Advance(doc.data(), doc.id));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function updateAdvance(request: Request, response: Response) {
  try {
    const advanceToUpdate = Advance(request.body);
    await db
      .collection(collection)
      .doc(request.params.id)
      .set(advanceToUpdate, { merge: true });
    return response
      .status(200)
      .json(
        Message(
          "Avance actualizado",
          `Avance con id: ${request.params.id} actualizado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function deleteAdvance(request: Request, response: Response) {
  try {
    await db.collection(collection).doc(request.params.id).delete();
    return response
      .status(200)
      .json(
        Message(
          "Avance eliminado",
          `Avance con id: ${request.params.id} eliminado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listAdvance(request: Request, response: Response) {
  try {
    let page = parseInt(request.params.page);
    let limit = parseInt(request.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("date")
      .offset(avoid)
      .limit(limit)
      .get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Advance(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function countAdvance(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}
