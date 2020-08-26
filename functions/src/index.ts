import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from 'cors';

//admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://proyecto-javascript-8ecde.firebaseio.com"
});

const db = admin.firestore();
db.settings({ignoreUndefinedProperties : true});

const main = express();
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended: false}));
main.use('/api', require('./employee').router);
main.use('/api', require('./client').router);
main.use('/api', require('./project').routes);


export const api = functions.https.onRequest(main);
export { db };
