import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './listCategoriesUseCase'
import { container } from 'tsyringe'

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    const categoriesList = await listCategoriesUseCase.execute()

    return response.status(200).send({ categoriesList })
  }
}

export { ListCategoriesController }
