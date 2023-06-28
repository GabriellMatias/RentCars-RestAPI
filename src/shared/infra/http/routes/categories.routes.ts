import { Router } from 'express'
import 'reflect-metadata'
import multer from 'multer'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategorie/importCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController'

const upload = multer({ dest: './tmp' })

const categoriesRoutes = Router()
/** Agora posso utilizar o repositorio do postgres para utilizar qualquer
 * banco de dados
 */

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
)

export { categoriesRoutes }
