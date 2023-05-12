import { Repository, getRepository } from 'typeorm'
import { UserRepositoryProps } from '../repositories/UsersRepositoryProps'
import { User } from '../entities/User'
import { UserProps } from '../@UserProps/UserProps'

class UsersRepository implements UserRepositoryProps {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    username,
    // eslint-disable-next-line camelcase
    driver_license,
    password,
    email,
  }: UserProps): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      // eslint-disable-next-line camelcase
      driver_license,
      password,
      email,
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }
