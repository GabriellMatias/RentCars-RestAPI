import { Router } from 'express'
import { CategoriesRepository } from '../repositories/categoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()
const createCategoryService = new CreateCategoryService(categoriesRepository)

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  createCategoryService.execute({ name, description })
  return response.status(201).send({ message: 'Category create successfully' })
})

categoriesRoutes.get('/', (request, response) => {
  const categoriesList = categoriesRepository.list()

  return response.status(200).send({ categoriesList })
})

export { categoriesRoutes }
