import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import createDBConnection from '../typeOrm'
import '../../../shared/container'
import { AppError } from './errors/appError'
import { routers } from '@shared/infra/http/routes'

createDBConnection('database_ignite')
const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routers)

// tratando errors
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal Server - ${err.message}`,
    })
  },
)

export { app }
