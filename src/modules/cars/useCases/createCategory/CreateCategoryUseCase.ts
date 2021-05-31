import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
        console.log('Cheguei no UseCase');

        const categoryAllreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAllreadyExists) {
            throw new Error('Essa categoria já existe.');
        }
    
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };