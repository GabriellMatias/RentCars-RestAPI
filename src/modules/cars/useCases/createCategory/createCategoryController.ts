import { Response } from 'express'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'
import { container } from 'tsyringe'

class CreateCategoryController {
  handle(request: Request, response: Response): Response {
    const { name, description }: any = request.body
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)
    createCategoryUseCase.execute({ name, description })
    return response
      .status(201)
      .send({ message: 'Category create successfully' })
  }
}

export { CreateCategoryController }
