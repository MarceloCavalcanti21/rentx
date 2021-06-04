import { inject, injectable } from 'tsyringe';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

import AppError from '../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}
    
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAllreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAllreadyExists) {
            throw new AppError('Essa categoria já existe.');
        }
    
        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };