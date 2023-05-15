import { hash } from 'bcryptjs'
import { UserProps } from '../../@UserProps/UserProps'
import { UserRepositoryProps } from '../../repositories/UsersRepositoryProps'

import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/appError'

@injectable()
class CreateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryProps,
  ) {}

  async execute({
    name,
    // eslint-disable-next-line camelcase
    driver_license,
    password,
    email,
  }: UserProps): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User Already Exists', 400)
    }

    // Criptografando senha
    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name,
      // eslint-disable-next-line camelcase
      driver_license,
      password: passwordHash,
      email,
      isAdmin: false,
    })
  }
}

export { CreateUserUseCase }
