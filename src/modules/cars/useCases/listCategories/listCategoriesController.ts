import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './listCategoriesUseCase'

class ListCategoriesController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response): Response {
    const categoriesList = this.listCategoriesUseCase.execute()

    return response.status(200).send({ categoriesList })
  }
}

export { ListCategoriesController }
