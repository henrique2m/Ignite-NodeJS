import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICreateCategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUserCase {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUserCase };
