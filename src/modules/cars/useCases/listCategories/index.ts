import { CategoriesRepository } from '../../repositories/categoriesRepository'
import { ListCategoriesController } from './listCategoriesController'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

const listCategoriesRepository = null
const listCategoriesUseCase = new ListCategoriesUseCase(
  listCategoriesRepository,
)
export const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
)
