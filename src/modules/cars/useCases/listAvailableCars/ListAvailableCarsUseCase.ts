import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
    brand?: string;
    name?: string;
    category_id?: string;
}


@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    
    async execute({
        brand,
        name,
        category_id,
    }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(
            brand,
            name,
            category_id,
        );

        return cars;
    }
}

export { ListAvailableCarsUseCase };