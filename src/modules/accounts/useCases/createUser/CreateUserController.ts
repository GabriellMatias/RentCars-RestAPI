import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const { name, username, email, password, driver_license } = request.body
    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      username,
      email,
      password,
      // eslint-disable-next-line camelcase
      driver_license,
      isAdmin: false,
    })
    return response.status(201).send()
  }
}

export { CreateUserController }
