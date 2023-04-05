import { Specification } from '../model/Specification'
import {
  CreateSpecificationProps,
  SpecificationRepositoryProps,
} from './implementations/InterfaceSpecificationRepository'

class SpecificationsRepository implements SpecificationRepositoryProps {
  private specifications: Specification[]

  constructor() {
    /* Inicialiazando variavel */
    this.specifications = []
  }

  create({ name, description }: CreateSpecificationProps): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })
    this.specifications.push(specification)
  }

  /* Metodo de listagem de categoria */
  list(): Specification[] {
    return this.specifications
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find((c) => c.name === name)
    return specification
  }
}

export { SpecificationsRepository }
