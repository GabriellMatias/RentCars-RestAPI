import { SpecificationsRepository } from '../../repositories/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationsRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
)
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
)
