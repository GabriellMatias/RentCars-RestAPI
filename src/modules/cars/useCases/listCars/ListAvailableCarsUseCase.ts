import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CarsRespository')
    private carsRepository: CarRepositoryProps,
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: RequestProps): Promise<Car[] | Car | null> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    )
    return cars
  }
}
