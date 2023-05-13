import { Router } from 'express'
import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specifications.routes'
import { usersRoutes } from './users.routes'
import { authenticateRoutes } from './authenticate.routes'

const routers = Router()

/* Rota de categorias */
routers.use('/categories', categoriesRoutes)
routers.use('/specifications', specificationRoutes)
routers.use('/users', usersRoutes)
routers.use('/sessions', authenticateRoutes)

export { routers }
