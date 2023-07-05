import { Repository, getRepository } from 'typeorm'

import {
  CreateSpecificationProps,
  SpecificationRepositoryProps,
} from '@modules/cars/repositories/InterfaceSpecificationRepository'
import { Specification } from '../entities/Specification'

class SpecificationsRepository implements SpecificationRepositoryProps {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  // TODO
  async findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error('Method not implemented.')
  }

  async create({
    name,
    description,
  }: CreateSpecificationProps): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    })
    await this.repository.save(specification)
    return specification
  }

  /* Metodo de listagem de categoria */
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    })
    return specification
  }
}

export { SpecificationsRepository }
