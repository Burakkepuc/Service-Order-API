import { Router } from 'express'
const router = Router();
import ServicesController from '../controllers/servicesController';

router.get('/getAll', ServicesController.getAll);


export default router;
