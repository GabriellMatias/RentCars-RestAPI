import { CategoriesRepository } from '../../repositories/categoriesRepository'

interface RequestProps {
  name: string
  description: string
}

class CreateCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepository) {}

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
