import { CategoriesRepository } from '../../repositories/categoriesRepository'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({ name, description }: RequestProps) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )
    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists')
    }
    await this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
