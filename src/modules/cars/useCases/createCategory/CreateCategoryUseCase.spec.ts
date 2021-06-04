import AppError from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/fakes/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Criar Categoria', () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });
    
    it('Isto deve permitir que uma categoria seja criada', async () => {
        const category = {
            name: 'Teste de categoria: nome',
            description: 'Teste de categoria: descrição'
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty('id');
    });

    it('Isto não deve permitir que uma categoria seja criada com o mesmo nome de outra já existente', async () => {
        expect(async () => {
            const category = {
                name: 'Teste de categoria: nome',
                description: 'Teste de categoria: descrição'
            };
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})