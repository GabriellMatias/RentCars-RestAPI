import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { SpecificationRepositoryProps } from '@modules/cars/repositories/InterfaceSpecificationRepository'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  car_id: string
  specification_id: string[]
}

// @injectable()
export class CreateCarSpecificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    // @inject('CarsRepository')
    private carsRepository: CarRepositoryProps,
    private specificationsRepository: SpecificationRepositoryProps,
  ) {}

  async execute({ car_id, specification_id }: RequestProps): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findById(car_id)

    if (!carAlreadyExists) {
      throw new AppError('Car not found!')
    }

    const specification = await this.specificationsRepository.findByIds(
      specification_id,
    )
    carAlreadyExists.specifications = specification

    await this.carsRepository.create(carAlreadyExists)
  }
}
