import { Category } from '../../entities/Category'
import { CategoriesRepositoryProps } from '../../repositories/implementations/InterfaceCategoriesRepository'

class ListCategoriesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
export { ListCategoriesUseCase }
