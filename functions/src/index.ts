import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { clientRoutes } from "./routes/client.routes";
import { employeeRoutes } from "./routes/employee.routes";
import { projectRoutes } from "./routes/project.routes";
import { advanceRoutes } from "./routes/advance.routes";
import { contractRoutes } from "./routes/contract.routes";
import { dealsRoutes } from "./routes/deals.routes";

//admin.initializeApp(functions.config().firebase);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://proyecto-javascript-8ecde.firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true, timestampsInSnapshot: true });

const server = express();
server.use(bodyParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(cors({ origin: true }));

clientRoutes(server);
employeeRoutes(server);
projectRoutes(server);
contractRoutes(server);
advanceRoutes(server);
dealsRoutes(server);

export const api = functions.https.onRequest(server);
export { db };
