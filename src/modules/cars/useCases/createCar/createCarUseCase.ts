import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
export class CreateCarUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('carsRepository')
    private carsRepository: CarRepositoryProps,
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: RequestProps): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.listByLicensePlate(
      license_plate,
    )
    if (carAlreadyExists) {
      throw new AppError('This license plate already exists')
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    })
    return car
  }
}
