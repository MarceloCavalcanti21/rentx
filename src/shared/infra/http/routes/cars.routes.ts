import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.use(ensureAuthenticated);

carsRoutes.post('/', ensureAdmin, createCarController.handle);
carsRoutes.get('/available', ensureAdmin, listAvailableCarsController.handle);

export { carsRoutes };