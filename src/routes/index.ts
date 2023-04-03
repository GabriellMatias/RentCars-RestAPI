import { Router } from 'express'
import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'

const routers = Router()

/* Rota de categorias */
routers.use('/categories', categoriesRoutes)
routers.use('/specifications', specificationRoutes)

export { routers }
