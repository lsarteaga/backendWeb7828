import * as admin from "firebase-admin";
import { Response, Request } from "express";
import { Message } from "../interfaces/message";
import { handleError } from "../interfaces/handler";

export async function singUp(request: Request, response: Response) {
  try {
    const { email, password, displayName, role } = request.body;
    const user = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    await admin.auth().setCustomUserClaims(user.uid, { role });
    return response
      .status(201)
      .json(
        Message("Success", `User ${user.displayName} registered`, "success")
      );
  } catch (error) {
    return handleError(response, error);
  }
}
