import { CategoriesRepository } from '../../repositories/categoriesRepository'
import { ListCategoriesController } from './listCategoriesController'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

export default () => {
  const listCategoriesRepository = new CategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCase(
    listCategoriesRepository,
  )
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  )
  return listCategoriesController
}
