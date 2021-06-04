import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

import AppError from '../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}
    
    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAllreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAllreadyExists) {
            throw new AppError('Essa categoria já existe.');
        }
    
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };