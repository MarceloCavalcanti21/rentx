import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.use(ensureAuthenticated);

carsRoutes.post('/', ensureAdmin, createCarController.handle);
carsRoutes.post('/specifications/:id', ensureAdmin, createCarSpecificationController.handle);
carsRoutes.get('/available', ensureAdmin, listAvailableCarsController.handle);

export { carsRoutes };