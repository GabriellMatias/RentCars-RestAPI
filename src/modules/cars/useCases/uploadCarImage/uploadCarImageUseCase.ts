import { CarsImageRepositoryProps } from '@modules/cars/repositories/InterfaceCarImage'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  car_id: string
  image_name: string[]
}

@injectable()
export class UploadCarImageUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CarsImageRepository')
    private carImageRepository: CarsImageRepositoryProps,
  ) {}

  async execute({ car_id, image_name }: RequestProps) {
    image_name.map(async (image) => {
      await this.carImageRepository.create(car_id, image)
    })
  }
}
