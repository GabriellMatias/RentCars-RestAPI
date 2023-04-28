import { Category } from '../../entities/Category'
import { CategoriesRepositoryProps } from '../../repositories/implementations/InterfaceCategoriesRepository'

class ListCategoriesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: CategoriesRepositoryProps) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list()
    return categories
  }
}
export { ListCategoriesUseCase }
