import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeOrm'

let connection: Connection
let adminToken: string

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuidv4()
    const password = await hash('admin', 8)

    await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXXX')
        `)

    const { body } = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    adminToken = body.jwtToken
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category supertest',
        description: 'Description supertest',
      })
      .set({
        Authorization: `Bearer ${adminToken}`,
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      })

    expect(response.status).toBe(401)
  })
})
