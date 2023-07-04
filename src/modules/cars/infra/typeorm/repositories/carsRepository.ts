import { CreateCarsRepositoryProps } from '@modules/cars/dtos/CarsInterfaceDTO'
import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { Car } from '../entities/Car'
import { Repository, getRepository } from 'typeorm'

export class CarsRepository implements CarRepositoryProps {
  private repository: Repository<Car>
  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    liscense_plate,
    name,
  }: CreateCarsRepositoryProps): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      fine_amount,
      description,
      license_plate: liscense_plate,
      name,
    })
    await this.repository.save(car)
    return car
  }

  async listByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    })
    return car
  }
}
