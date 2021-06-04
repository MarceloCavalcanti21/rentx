import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Este token não existe!', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, '58ba6b3d7f792e27c01696773ecaa7f6') as ITokenPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Este usuário não existe!', 401);
        }

        request.user = {
            id: user_id
        }

        return next();
    } catch {
        throw new AppError('Token JWT inválido!', 401);
    }
}
