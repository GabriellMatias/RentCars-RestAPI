import { CategoriesRepository } from '../repositories/categoriesRepository'

interface RequestProps {
  name: string
  description: string
}

class CreateCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: RequestProps) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)
    if (categoryAlreadyExists) {
      throw new Error('Category Already Exists')
    }
    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryService }
