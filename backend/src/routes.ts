import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagerController from './controllers/OrphanagesController';

const routes = Router();
const upload =  multer(uploadConfig);

// app.get('/users/:id', (request, response) => {
//     console.log(request.query);
//     console.log(request.params);
//     console.log(request.body);
//     return response.json({message:'Hello World!'});
// });

routes.get('/orphanages', OrphanagerController.index);
routes.get('/orphanages/:id', OrphanagerController.show);
routes.post('/orphanages', upload.array('images'), OrphanagerController.create);

export default routes;