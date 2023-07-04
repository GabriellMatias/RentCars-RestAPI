import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  CreateSpecificationProps,
  SpecificationRepositoryProps,
} from '../InterfaceSpecificationRepository'

export class SpecificationInMemory implements SpecificationRepositoryProps {
  specifications: Specification[] = []
  async create({ name, description }: CreateSpecificationProps): Promise<void> {
    const specification = new Specification()

    Object.assign(specification, {
      description,
      name,
    })
    this.specifications.push(specification)
  }

  async list(): Promise<Specification[]> {
    return this.specifications
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name,
    )
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id),
    )
  }
}
