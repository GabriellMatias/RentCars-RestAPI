import { Response, Request } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { container } from 'tsyringe'

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description }: any = request.body
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    createCategoryUseCase.execute({ name, description })
    return response
      .status(201)
      .send({ message: 'Category create successfully' })
  }
}

export { CreateCategoryController }
