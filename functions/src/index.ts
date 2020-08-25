import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { clientRoutes } from "./routes/client.routes";
import { employeeRoutes } from "./routes/employee.routes";
import { projectRoutes } from "./routes/project.routes";

// admin.initializeApp(functions.config().firebase);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://proyecto-javascript-8ecde.firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true, timestampsInSnapshot: true });

const server = express();
server.use(cors({ origin: true }));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
clientRoutes(server);
employeeRoutes(server);
projectRoutes(server);
export const api = functions.https.onRequest(server);
export { db };
