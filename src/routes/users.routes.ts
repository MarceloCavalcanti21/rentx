import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
// import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';

const usersRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createUserController = new CreateUserController();
// const listCategoryController = new ListCategoryController();

usersRoutes.post('/', createUserController.handle);

// usersRoutes.get('/', listCategoryController.handle);

export { usersRoutes };