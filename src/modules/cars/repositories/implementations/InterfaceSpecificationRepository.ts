import { Specification } from '../../model/Specification'

interface CreateSpecificationProps {
  name: string
  description: string
}

interface SpecificationRepositoryProps {
  create({ name, description }: CreateSpecificationProps): void
  list(): Specification[]
  findByName(name: string): Specification
}

export { SpecificationRepositoryProps, CreateSpecificationProps }
