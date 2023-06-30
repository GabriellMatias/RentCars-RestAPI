import { SpecificationRepositoryProps } from '@modules/cars/repositories/InterfaceSpecificationRepository'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationRepositoryProps,
  ) {}

  async execute({ name, description }: RequestProps): Promise<void> {
    const SpecificationAlreadyExitis =
      await this.specificationsRepository.findByName(name)
    if (SpecificationAlreadyExitis) {
      throw new AppError(`Specification ${name} already exists`, 400)
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
