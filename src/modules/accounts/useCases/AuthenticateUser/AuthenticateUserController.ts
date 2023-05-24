import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { password, email } = request.body

    const autheticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const authenticateInfo = await autheticateUserUseCase.execute({
      email,
      password,
    })

    return response.json(authenticateInfo)
  }
}
export { AuthenticateUserController }
