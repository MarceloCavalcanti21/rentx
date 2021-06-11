import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    
    cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        licence_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            licence_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicencePlate(licence_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.licence_plate === licence_plate);

        return car;
    }

    async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
        throw new Error("Method not implemented.");
    }
}

export { CarsRepositoryInMemory };