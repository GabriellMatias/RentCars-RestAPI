import { container } from 'tsyringe'
import { CreateCarUseCase } from './createCarUseCase'
import { Request, Response } from 'express'

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase)
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body
    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    })
    return response.status(201).send({ car })
  }
}
