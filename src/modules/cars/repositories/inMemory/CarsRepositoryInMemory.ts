import { CreateCarsRepositoryProps } from '@modules/cars/dtos/CarsInterfaceDTO'
import { CarRepositoryProps } from '../InterfaceCarRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

export class CarsRepositoryInMemory implements CarRepositoryProps {
  car: Car[] = []
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    liscense_plate,
    name,
  }: CreateCarsRepositoryProps): Promise<void> {
    const cars = new Car()

    Object.assign(cars, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      liscense_plate,
      name,
    })
    this.car.push(cars)
  }

  async listByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.car.find((car) => car.license_plate === license_plate)
  }
}
