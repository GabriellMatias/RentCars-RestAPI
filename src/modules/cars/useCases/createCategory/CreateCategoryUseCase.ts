import { CategoriesRepositoryProps } from '@modules/cars/repositories/InterfaceCategoriesRepository'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  name: string
  description: string
}

@injectable()
class CreateCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepositoryProps,
  ) {}

  async execute({ name, description }: RequestProps) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )
    if (categoryAlreadyExists) {
      throw new AppError('Category Already Exists', 400)
    }
    await this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
