import { Request, Response } from "express";
import { db } from "../index";
import { Message } from "../interfaces/message";
import { handleError } from "../interfaces/handler";
import { Contract } from "../interfaces/contract.interface";
import { Employee } from "../interfaces/employee.interface";
import { Client } from "../interfaces/client.interface";

const collection = "contracts";

export async function createContract(request: Request, response: Response) {
  try {
    console.log("entre al try");
    console.log(request.body);
    const newContract = Contract(request.body);
    console.log(newContract);
    const idemployee = newContract.idemployee;
    const docEmployee = await db.collection("employees").doc(idemployee).get();
    newContract.contractor = Employee(docEmployee.data(), docEmployee.id);
    const idclient = newContract.idclient;
    const docClient = await db.collection("clients").doc(idclient).get();
    console.log(idemployee);
    console.log(idclient);
    newContract.client = Client(docClient.data(), docClient.id);
    const contractAdded = (await db.collection(collection).add(newContract)).id;
    return response
      .status(201)
      .json(
        Message(
          "Contrato agregado",
          `Contrato con id: ${contractAdded} agregado`,
          "success"
        )
      );
  } catch (error) {
    console.log("entre a la exepcion");
    return handleError(response, error);
  }
}

export async function retrieveContract(request: Request, response: Response) {
  try {
    const doc = await db.collection(collection).doc(request.params.id).get();
    if (!doc) {
      return response
        .status(404)
        .json(
          Message(
            "Contrato no encontrado",
            `Contrato con id: ${request.params.id} no encontrado`,
            "warning"
          )
        );
    }
    return response.status(200).json(Contract(doc, doc.id));
  } catch (error) {
    return handleError(response, error);
  }
}

export async function updateContract(request: Request, response: Response) {
  try {
    const contractToUpdate = Contract(request.body);
    await db
      .collection(collection)
      .doc(request.params.id)
      .set(contractToUpdate, { merge: true });
    return response
      .status(200)
      .json(
        Message(
          "Contrato actualizado",
          `Contrato con id: ${request.params.id} actualizado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function deleteContract(request: Request, response: Response) {
  try {
    await db.collection(collection).doc(request.params.id).delete();
    return response
      .status(200)
      .json(
        Message(
          "Contrato eliminado",
          `Contrato con id: ${request.params.id} eliminado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function countContract(request: Request, response: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return response.status(200).json({ numberDocs: snapshot.size });
  } catch (error) {
    return handleError(response, error);
  }
}

export async function listContract(request: Request, response: Response) {
  try {
    let page = parseInt(request.params.page);
    let limit = parseInt(request.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("startDate")
      .offset(avoid)
      .limit(limit)
      .get();
    return response
      .status(200)
      .json(snapshot.docs.map((doc) => Contract(doc.data(), doc.id)));
  } catch (error) {
    return handleError(response, error);
  }
}
