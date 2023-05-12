import { UserProps } from '../../@UserProps/UserProps'
import { UserRepositoryProps } from '../../repositories/UsersRepositoryProps'

import { inject, injectable } from 'tsyringe'

@injectable()
class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryProps,
  ) {}

  async execute({
    name,
    username,
    // eslint-disable-next-line camelcase
    driver_license,
    password,
    email,
  }: UserProps): Promise<void> {
    await this.usersRepository.create({
      name,
      username,
      // eslint-disable-next-line camelcase
      driver_license,
      password,
      email,
      isAdmin: false,
    })
  }
}

export { CreateUserUseCase }
