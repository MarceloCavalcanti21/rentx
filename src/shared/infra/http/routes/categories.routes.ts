import multer from 'multer';
import { Router } from 'express';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoriesRoutes.use(ensureAuthenticated);

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post('/', ensureAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post('/import', upload.single('file'), ensureAdmin, importCategoryController.handle);

export { categoriesRoutes };