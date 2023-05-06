import { inject, injectable } from 'tsyringe'
import { SpecificationRepositoryProps } from '../../repositories/implementations/InterfaceSpecificationRepository'

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
      throw new Error(`Specification ${name} already exists`)
    }

    await this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationUseCase }
