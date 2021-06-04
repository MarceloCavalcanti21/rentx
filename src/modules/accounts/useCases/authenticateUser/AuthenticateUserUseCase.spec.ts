import AppError from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/fakes/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Autenticação de usuário', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    
    it('Isto deve permitir autenticar um usuário', async () => {
        const user: ICreateUserDTO = {
            name: 'Teste: nome',
            email: 'Teste: e-mail',
            password: 'Teste: password',
            driver_license: 'Teste: CNH',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('Isto não deve permitir autenticar um usuário inexistente', async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'none',
                password: 'none',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Isto não deve permitir autenticar um usuário com a senha incorreta', async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'Teste: nome',
                email: 'Teste: e-mail',
                password: 'Teste: password',
                driver_license: 'Teste: CNH',
            };
    
            await createUserUseCase.execute(user);
    
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'none',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})