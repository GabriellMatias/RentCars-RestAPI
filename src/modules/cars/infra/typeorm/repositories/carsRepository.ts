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
    license_plate,
    name,
    specifications,
    id,
  }: CreateCarsRepositoryProps): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      fine_amount,
      description,
      license_plate,
      name,
      specifications,
      id,
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

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car | Car[]> {
    /* Utilizando um query builder do typeOrm */
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand })
    }
    if (name) {
      carsQuery.andWhere('c.name = :name', { name })
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id })
    }
    const cars = await carsQuery.getMany()
    return cars
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne(car_id)
    return car
  }
}
