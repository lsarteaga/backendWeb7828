import * as main from './index';
import * as firebaseHelper from 'firebase-functions-helper';
import * as Router from 'express';
import {Project} from "./interfaces/project.interface";
import {Message} from "./interfaces/message";
import {Employee} from "./interfaces/employee.interface";
import {Client} from "./interfaces/client.interface";

const routes = Router();
const db = main.db;
const collection = "projects";

routes.post('/projects', async (req, res) => {
    try {
        const newProject = Project(req.body);
        const idemployee = newProject.idemployee;
        const idclient =  newProject.idclient;
        const docEmployee =  await db.collection('employees').doc(idemployee).get();
        const docClient = await db.collection('clients').doc(idclient).get();
        newProject.employee = Employee(docEmployee.data(), docEmployee.id);
        newProject.client = Client(docClient.data(), docClient.id);
        console.log(newProject);
        const id = (await db.collection(collection).add(newProject)).id;
        res.status(201).json(
            Message('Project Created', `Project id: ${id}`, 'success')
        );
    } catch (error) {
        res.status(401).json(
            Message('Error', `An error has ocurred: ${error}`, 'error')
        );
    }
});

routes.get('/projects/:id', (req, res) => {
    const id = req.params['id'];
    firebaseHelper.firestore.getDocument(db, collection, id)
        .then(doc => {
            let projectQuery = Project(doc, doc.id);
            console.log(projectQuery);
            res.status(200).json(projectQuery);
        })
        .catch(e => res.status(400).json(Message('Error', `An error has ocurred: ${e}`, 'error')));
});

routes.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const project = Project(req.body, id);
    firebaseHelper.firestore.updateDocument(db, collection, id, project)
        .then(result => {
            res.status(201).json(
                Message('Project Updated', `Projects id: ${id}`, 'success')
            );
        }).catch(e => {
        res.status(400).json(
            Message('Error', `An error has ocurred: ${e}`, 'error')
        );
    });
});

routes.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await firebaseHelper.firestore.deleteDocument(db, collection, id);
        res.status(201).json(
            Message('Project Deleted', `Deleted id: ${id}`, 'success')
        );
    } catch (e) {
        res.status(400).json(
            Message('Error', `An error has ocurred: ${e}`, 'error')
        );
    }
});

routes.get('/projects/:page/:limit', (req, res) => {
    let page = parseInt(req.params.page);
    let limit = parseInt(req.params.limit);
    let avoid = page == 1 ? 0 : (page - 1) * limit;
    db.collection(collection).orderBy('dateInit').offset(avoid).limit(limit).get()
        .then(snapshot => res.status(200).json(snapshot.docs.map(doc => Project(doc.data(), doc.id))))
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

routes.get('/count/projects', (req, res) => {
    db.collection(collection)
        .get()
        .then(snapshot => {
            let size = snapshot.size;
            res.status(200).json( { numberDocs : size } )
        })
        .catch(err => res.status(400).send(`An error has ocurred ${err}`));
});

export { routes };

