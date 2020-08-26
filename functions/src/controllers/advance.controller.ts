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
    newAdvance.employee = Employee(docEmployee.data(), idemployee);
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
        return response.status(200).json(Advance(doc, doc.id));
      }
    } catch (error) {
      return handleError(response, error);
    }
  }
}
