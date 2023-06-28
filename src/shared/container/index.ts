import { container } from 'tsyringe'

import { CategoriesRepository } from '@modules/cars/repositories/categoriesRepository'

import { SpecificationsRepository } from '@modules/cars/repositories/SpecificationsRepository'

import { UserRepositoryProps } from '@modules/accounts/repositories/UsersRepositoryProps'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { CategoriesRepositoryProps } from '@modules/cars/infra/typeorm/repositories/InterfaceCategoriesRepository'
import { SpecificationRepositoryProps } from '@modules/cars/infra/typeorm/repositories/InterfaceSpecificationRepository'

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
