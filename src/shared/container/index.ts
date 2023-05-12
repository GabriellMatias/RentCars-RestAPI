import { container } from 'tsyringe'

import { CategoriesRepositoryProps } from '../../modules/cars/repositories/implementations/InterfaceCategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/categoriesRepository'

import { SpecificationRepositoryProps } from '../../modules/cars/repositories/implementations/InterfaceSpecificationRepository'
import { SpecificationsRepository } from '../../modules/cars/repositories/SpecificationsRepository'

import { UserRepositoryProps } from '../../modules/accounts/repositories/UsersRepositoryProps'
import { UsersRepository } from '../../modules/accounts/implementations/UsersRepository'

container.registerSingleton<CategoriesRepositoryProps>(
  'CategoriesRepository',
  CategoriesRepository,
)

container.registerSingleton<SpecificationRepositoryProps>(
  'SpecificationsRepository',
  SpecificationsRepository,
)

container.registerSingleton<UserRepositoryProps>(
  'UsersRepository',
  UsersRepository,
)
