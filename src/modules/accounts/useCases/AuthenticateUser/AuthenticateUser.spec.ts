import { AppError } from '@shared/infra/http/errors/appError'
import { UserProps } from '../../@UserProps/UserProps'
import { InMemoryUsersRepository } from '../../repositories/inMemory/InMemoryUsersRepositry'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('Authenticate UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })
  it('Should be able to authenticate an user', async () => {
    const user: UserProps = {
      email: 'matias@gmail.com',
      name: 'Matias',
      password: '123456',
      driver_license: 'MIT',
    }
    await createUserUseCase.execute(user)

    const authenticateUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(authenticateUser).toHaveProperty('jwtToken')
  })
  it('Should NOT be able to authenticate an inexistent user ', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'Exmaple@gmai.com',
        password: '1231',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('Should NOT be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      const user: UserProps = {
        email: 'matias@gmail.com',
        name: 'Matias',
        password: '123456',
        driver_license: 'MIT',
      }
      await createUserUseCase.execute(user)
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '1231',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
