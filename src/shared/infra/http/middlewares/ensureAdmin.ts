import AppError from '@shared/errors/AppError';

import { Request, Response, NextFunction } from 'express';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { id } = request.user;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError('Esse usuário não tem permissão de administrador');
    }

    return next();
}
