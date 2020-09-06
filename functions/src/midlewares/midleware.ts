import { Response, Request } from "express";
import * as admin from "firebase-admin";
import { Message } from "../interfaces/message";

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: Function
) {
  const { authorization } = request.headers;
  if (!authorization)
    return response
      .status(401)
      .send(Message("Unauthorized", "Without authorization", "warning"));
  if (!authorization.startsWith("Bearer")) {
    return response
      .status(401)
      .send(
        Message("Unauthorized", "Not start validation authorization", "warning")
      );
  }
  const split = authorization.split("Bearer");
  if (split.length !== 2) {
    return response
      .status(401)
      .send(Message("Unauthorized", "Not valid authorization", "warning"));
  }
  const token = split[1];
  try {
    const decodedToken: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);
    console.log("decodedToken", JSON.stringify(decodedToken));
    response.locals = {
      ...response.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email,
    };
    return next();
  } catch (error) {
    console.error(`${error.code} - ${error.message}`);
    return response
      .status(401)
      .send({ message: "Unauthorized - not valid token" });
  }
}

export function isAuthorized(opts: {
  hasRole: Array<"admin" | "employee" | "contractor" | "client">;
}) {
  return (request: Request, response: Response, next: Function) => {
    const { role } = response.locals;
    if (!role) {
      return response
        .status(403)
        .send(Message("Unauthorized", "Not valid Role", "error"));
    }
    if (opts.hasRole.includes(role)) {
      return next();
    }
    return response
      .status(403)
      .send(Message("Unauthorized", "Not valid Role", "error"));
  };
}
