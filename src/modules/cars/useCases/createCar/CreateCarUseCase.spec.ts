import AppError from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/fakes/CarsRepositoryInMemory";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Criar Carro', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    
    it('Isto deve permitir que um carro seja criado', async () => {
        const car = await createCarUseCase.execute({
            name: "name",
            description: "description",
            daily_rate: 100,
            licence_plate: "placa inicial",
            fine_amount: 60,
            brand: "brand",
            category_id: "category",
        });

        expect(car).toHaveProperty('id');
    });

    it('Isto não deve permitir que um carro seja criado com o mesmo número de placa de outro já existente', async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Carro1",
                description: "description",
                daily_rate: 100,
                licence_plate: "ae-01",
                fine_amount: 60,
                brand: "brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Carro2",
                description: "description",
                daily_rate: 100,
                licence_plate: "ae-01",
                fine_amount: 60,
                brand: "brand",
                category_id: "category",
            });
            
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Isto deve permitir que um carro seja criado com disponibilidade true, por padrão', async () => {
        const car = await createCarUseCase.execute({
            name: "Carro disponível",
            description: "description",
            daily_rate: 100,
            licence_plate: "nova placa",
            fine_amount: 60,
            brand: "brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
})