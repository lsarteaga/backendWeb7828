import * as main from './index';
import * as Router from 'express';
import { Employee } from './interfaces/employee.interface';
import * as firebaseHelper from 'firebase-functions-helper';
import { Message } from "./interfaces/message";

const router = Router();
const db = main.db;
const collection = 'employees';

router.post('/employees', async (req, res) => {
    try {
        const newEmployee = Employee(req.body);
        console.log(newEmployee);
        const newDoc = await firebaseHelper.firestore.createNewDocument(db, collection, newEmployee);
        res.status(201).json(
            Message('Employee Created', `Employee id: ${newDoc.id}`, 'success')
        );
    } catch (error) {
        res.status(400).json(
            Message('Error', `An error has ocurred: ${error}`, 'error')
        );
    }
});

router.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    firebaseHelper.firestore.getDocument(db, collection, id)
        .then(doc => {
            let employeeQuery = Employee(doc, doc.id);
            console.log(employeeQuery);
            res.status(200).json(employeeQuery);
        })
        .catch(e => res.status(400).json(Message('Error', `An error has ocurred: ${e}`, 'error')));
});

router.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const employee = Employee(req.body, id);
    firebaseHelper.firestore.updateDocument(db, collection, id, employee)
            .then(result => {
                res.status(201).json(
                    Message('Employee Updated', `Employee id: ${id}`, 'success')
                );
            }).catch(e => {
                res.status(400).json(
                    Message('Error', `An error has ocurred: ${e}`, 'error')
                );
            });
});

router.delete('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        res.status(201).json(
            Message('Employee Deleted', `Deleted id: ${id}`, 'success')
        );
    } catch (e) {
        res.status(400).json(
            Message('Error', `An error has ocurred: ${e}`, 'error')
        );
    }
});

router.get('/employees/:page/:limit', (req, res) => {
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('name').offset(avoid).limit(limit).get()
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Employee(doc.data(), doc.id))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

router.get('/count/employees', (req, res) => {
    db.collection(collection)
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});


export { router };

