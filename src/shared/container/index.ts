import { container } from 'tsyringe'

import { UserRepositoryProps } from '@modules/accounts/repositories/UsersRepositoryProps'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/categoriesRepository'
import { CategoriesRepositoryProps } from '@modules/cars/repositories/InterfaceCategoriesRepository'
import { SpecificationRepositoryProps } from '@modules/cars/repositories/InterfaceSpecificationRepository'
import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/carsRepository'
import { CarsImageRepositoryProps } from '@modules/cars/repositories/InterfaceCarImage'
import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/carsImageRepository'

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

container.registerSingleton<CarRepositoryProps>(
  'CarsRepository',
  CarsRepository,
)
container.registerSingleton<CarsImageRepositoryProps>(
  'CarsImageRepository',
  CarsImageRepository,
)
