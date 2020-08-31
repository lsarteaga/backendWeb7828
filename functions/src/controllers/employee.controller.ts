import { db } from "../index";
import { Response, Request } from "express";
import { Employee } from "../interfaces/employee.interface";
import { Message } from "../interfaces/message";
import { handleError } from "../interfaces/handler";

const collection = "employees";

export async function createEmployee(request: Request, response: Response) {
  try {
    const newEmployee = Employee(request.body);
    const employeeAdded = await db.collection(collection).add(newEmployee);
    return response
      .status(201)
      .json(
        Message(
          "Empleado agregado",
          `Empleado con id: ${employeeAdded.id} fue agregado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function retrieveEmployee(request: Request, response: Response) {
  try {
    const doc = await db.collection(collection).doc(request.params.id).get();
    if (!doc) {
      return response
        .status(404)
        .json(
          Message(
            "Empleado no encontrado",
            `Empleado con el id ${request.params.id} no encontrado`,
            "warning"
          )
        );
    }
    return response.status(200).json(Employee(doc.data(), doc.id));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function updateEmployee(request: Request, response: Response) {
  try {
    const employeeToUpdate = Employee(request.body);
    await db
      .collection(collection)
      .doc(request.params.id)
      .set(employeeToUpdate, { merge: true });
    return response
      .status(200)
      .json(
        Message(
          "Empleado actualizado",
          `Empleado con id: ${request.params.id} actualizado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function deleteEmployee(request: Request, response: Response) {
  try {
    await db.collection(collection).doc(request.params.id).delete();
    return response
      .status(200)
      .json(
        Message(
          "Empleado eliminado",
          `Empleado con id: ${request.params.id} fue eliminado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listEmployee(request: Request, response: Response) {
  try {
    let page = parseInt(request.params.page);
    let limit = parseInt(request.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("surname")
      .offset(avoid)
      .limit(limit)
      .get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Employee(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function countEmployee(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}
export async function listEmployeeAll(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).orderBy("surname").get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Employee(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}
