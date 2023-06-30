import { inject, injectable } from 'tsyringe'
import { Category } from '../../infra/typeorm/entities/Category'
import { CategoriesRepositoryProps } from '@modules/cars/repositories/InterfaceCategoriesRepository'

@injectable()
class ListCategoriesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProps,
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()
    return categories
  }
}
export { ListCategoriesUseCase }
