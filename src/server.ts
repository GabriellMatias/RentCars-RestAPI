import express from 'express'
import { routers } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger.json'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routers)

app.listen(3333, () => console.log('Server is running...'))
