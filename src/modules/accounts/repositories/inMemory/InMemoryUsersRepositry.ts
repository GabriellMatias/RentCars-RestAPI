import { UserProps } from '../../@UserProps/UserProps'
import { User } from '../../infra/typeorm/entities/User'
import { UserRepositoryProps } from '../UsersRepositoryProps'

export class InMemoryUsersRepository implements UserRepositoryProps {
  users: User[] = []

  async create({
    driver_license,
    email,
    name,
    password,
  }: UserProps): Promise<void> {
    const user = new User()
    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    })
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)
  }
}
