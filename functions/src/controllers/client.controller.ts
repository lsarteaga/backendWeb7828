import { Client } from "../interfaces/client.interface";
import { Response, Request } from "express";
import { db } from "../index";
import { Message } from "../interfaces/message";
import { handleError } from "../interfaces/handler";

const collection = "clients";

export async function createClient(request: Request, response: Response) {
  try {
    const newClient = Client(request.body);
    const clientAdded = await db.collection(collection).add(newClient);
    return response
      .status(201)
      .json(
        Message(
          "Cliente agregado",
          `Cliente con id: ${clientAdded.id}`,
          "success"
        )
      );
  } catch (error) {
    return handleError(response, error);
  }
}

export async function retrieveClient(req: Request, res: Response) {
  try {
    const doc = await db.collection(collection).doc(req.params.id).get();
    if (!doc) {
      return res
        .status(404)
        .json(
          Message(
            "Cliente no encontrado",
            `Cliente con id: ${req.params.id} no encontrado`,
            "warning"
          )
        );
    }
    return res.status(200).json(Client(doc.data(), doc.id));
  } catch (error) {
    return handleError(res, error);
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const clientToUpdate = Client(req.body);
    await db
      .collection(collection)
      .doc(req.params.id)
      .set(clientToUpdate, { merge: true });
    return res
      .status(200)
      .json(
        Message(
          "Cliente actualizado",
          `Cliente con id: ${req.params.id} actualizado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(res, error);
  }
}

export async function deleteClient(req: Request, res: Response) {
  try {
    await db.collection(collection).doc(req.params.id).delete();
    return res
      .status(200)
      .json(
        Message(
          "Cliente eliminado",
          `El cliente con id: ${req.params.id} fue eliminado`,
          "success"
        )
      );
  } catch (error) {
    return handleError(res, error);
  }
}

export async function listClient(req: Request, res: Response) {
  try {
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    let snapshot = await db
      .collection(collection)
      .orderBy("surname")
      .offset(avoid)
      .limit(limit)
      .get();
    return res
      .status(200)
      .json(snapshot.docs.map((doc) => Client(doc.data(), doc.id)));
  } catch (error) {
    return handleError(res, error);
  }
}

export async function countClient(req: Request, res: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    return res.status(200).json({
      numberDocs: snapshot.size,
    });
  } catch (error) {
    return handleError(res, error);
  }
}

export async function listClientAll(req: Request, res: Response) {
  try {
    let snapshot = await db.collection(collection).get();
    console.log("si pase del snapshot");
    return res
      .status(200)
      .json(snapshot.docs.map((doc) => Client(doc.data(), doc.id)));
  } catch (error) {
    return handleError(res, error);
  }
}
