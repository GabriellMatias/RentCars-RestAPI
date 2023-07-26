import { CreateCarsRepositoryProps } from '../dtos/CarsInterfaceDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface CarRepositoryProps {
  create(data: CreateCarsRepositoryProps): Promise<Car>
  listByLicensePlate(license_plate: string): Promise<Car | null>
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[] | Car | null>
  findById(car_id: string): Promise<Car | null>
  updateAvailable(car_id: string, available: boolean): Promise<void>
}
