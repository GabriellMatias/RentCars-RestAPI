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
    license_plate,
    name,
    specifications,
    id,
  }: CreateCarsRepositoryProps): Promise<Car> {
    const cars = new Car()

    Object.assign(cars, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    })
    this.car.push(cars)
    return cars
  }

  async listByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.car.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[] | Car | null> {
    return this.car.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car
      }
      return null
    })
  }

  async findById(car_id: string): Promise<Car> {
    return this.car.find((car) => car.id === car_id)
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const findIndex = this.car.findIndex((car) => car.id === car_id)
    this.car[findIndex].available = available
  }
}
