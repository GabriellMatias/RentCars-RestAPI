import { SpecificationRepositoryProps } from '../repositories/InterfaceSpecificationRepository'

interface RequestProps {
  name: string
  description: string
}

class CreateSpecificationService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private specificationsRepository: SpecificationRepositoryProps) {}

  execute({ name, description }: RequestProps): void {
    const SpecificationAlreadyExitis =
      this.specificationsRepository.findByName(name)
    if (SpecificationAlreadyExitis) {
      throw new Error(`Specification ${name} already exists`)
    }

    this.specificationsRepository.create({ name, description })
  }
}

export { CreateSpecificationService }
