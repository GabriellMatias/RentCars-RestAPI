import { inject, injectable } from 'tsyringe'
import { UserRepositoryProps } from '../../repositories/UsersRepositoryProps'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/infra/http/errors/appError'

interface AuthenticateUserUseCaseProps {
  email: string
  password: string
}
@injectable()
class AuthenticateUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepositoryProps,
  ) {}

  async execute({ email, password }: AuthenticateUserUseCaseProps) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Email or password incorrect', 400)
    }

    const correctPassword = await compare(password, user.password)

    if (!correctPassword) {
      throw new AppError('Email or password incorrect!', 400)
    }

    const jwtToken = sign({}, '759856cc8e350a731a254061b426c10a', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, jwtToken }
  }
}
export { AuthenticateUserUseCase }
