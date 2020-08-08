import * as firebaseHelper from "firebase-functions-helper";
import * as main from './index';
import { Client } from "./interfaces/client.interface";
import { Message } from "./interfaces/message";
import * as Router from "express";


const db = main.db;
const router = Router();
const collection = 'clients';

router.post('/clients', async (req, res) => {
    try {
       const newClient = Client(req.body);
       console.log(newClient);
       const clientAdded = await firebaseHelper.firestore
           .createNewDocument(db, collection, newClient);
       res.status(201).json(
         Message('Client Added', `Client id: ${clientAdded.id}`, 'success')
       );
    } catch (e) {
        res.status(400).json(Message('Error',`An error has ocurred: ${e}`,'error'));
    }
});

router.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    firebaseHelper.firestore.getDocument(db, collection, id)
        .then(doc => {
            let clientQuery = Client(doc, doc.id);
            console.log(clientQuery);
            res.status(200).json(clientQuery);
        })
        .catch(e => res.status(400).json(Message('Error',`An error has ocurred: ${e}`,'error')));
});

router.put('/clients/:id', async (req, res) => {
   const { id } = req.params;
   const client = Client(req.body, id);
   firebaseHelper.firestore.updateDocument(db, collection, id, client)
       .then(result => {
           res.status(201).json(
               Message('Client Updated', `Client id: ${id}`, 'success')
           );
       })
       .catch(e => {
           res.status(400).json(Message('Error',`An error has ocurred: ${e}`,'error'))
       });
});

router.delete('/clients/:id', async (req, res) => {
   try {
       const { id } = req.params;
       await firebaseHelper.firestore.deleteDocument(db, collection, id);
       res.status(201).json(
           Message('Client Deleted', `Deleted id: ${id}`,'success')
       );
   } catch (e) {
       res.status(400).json(Message('Error',`An error has ocurred: ${e}`,'error'));
   }
});

router.get('/clients/:page/:limit', (req, res) => {
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Client(doc.data(), doc.id))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

router.get('/count/clients', (req, res) => {
    db.collection(collection)
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { router };