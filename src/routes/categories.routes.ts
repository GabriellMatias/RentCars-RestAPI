import { Router } from 'express'

import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController'
import listCategoriesController from '../modules/cars/useCases/listCategories'
import { ImportCategoryController } from '../modules/cars/useCases/importCategorie/importCategoryController'

const upload = multer({ dest: './tmp' })

const categoriesRoutes = Router()
/** Agora posso utilizar o repositorio do postgres para utilizar qualquer
 * banco de dados
 */

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response)
})

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
