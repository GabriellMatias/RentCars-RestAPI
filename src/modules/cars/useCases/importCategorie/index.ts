import { ImportCategoryController } from './importCategoryController'
import { ImportCategoryUseCase } from './importCategoryUseCase'

const categoriesRepositoy = null
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepositoy)
export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
)
