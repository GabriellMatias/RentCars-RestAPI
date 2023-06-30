import { container } from 'tsyringe'

import { UserRepositoryProps } from '@modules/accounts/repositories/UsersRepositoryProps'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/categoriesRepository'
import { CategoriesRepositoryProps } from '@modules/cars/repositories/InterfaceCategoriesRepository'
import { SpecificationRepositoryProps } from '@modules/cars/repositories/InterfaceSpecificationRepository'

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
