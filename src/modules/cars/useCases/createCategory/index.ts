import { CreateCategoryController } from './createCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { CategoriesRepository } from '../../repositories/categoriesRepository'

const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
)
export { createCategoryController, createCategoryUseCase }
