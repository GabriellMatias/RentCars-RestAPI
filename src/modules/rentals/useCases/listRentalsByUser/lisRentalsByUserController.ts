import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListRentalsByUserUseCase } from './listRentalsByUserUseCase'

export class ListRentalsByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const rentals = await listRentalsByUserUseCase.execute(id)

    return response.status(200).json(rentals)
  }
}
