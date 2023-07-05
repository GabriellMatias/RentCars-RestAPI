import { CarsImageRepositoryProps } from '@modules/cars/repositories/InterfaceCarImage'
import { CarsImage } from '../entities/CarImage'
import { Repository, getRepository } from 'typeorm'

export class CarsImageRepository implements CarsImageRepositoryProps {
  private repository: Repository<CarsImage>
  constructor() {
    this.repository = getRepository(CarsImage)
  }

  async create(car_id: string, image_name: string): Promise<CarsImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })
    await this.repository.save(carImage)
    return carImage
  }
}
