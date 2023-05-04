import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

class ListCategoriesController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const categoriesList = await this.listCategoriesUseCase.execute()

    return response.status(200).send({ categoriesList })
  }
}

export { ListCategoriesController }
