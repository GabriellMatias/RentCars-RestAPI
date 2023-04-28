import { CreateCategoryController } from './createCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CategoriesRepository } from '../../repositories/categoriesRepository'

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  )
  return createCategoryController
}
