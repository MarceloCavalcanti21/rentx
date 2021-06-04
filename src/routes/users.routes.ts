import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
// import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
// const listCategoryController = new ListCategoryController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);

// usersRoutes.get('/', listCategoryController.handle);

export { usersRoutes };