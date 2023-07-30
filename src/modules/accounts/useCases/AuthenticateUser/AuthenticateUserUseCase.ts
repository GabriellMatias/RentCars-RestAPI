import { inject, injectable } from 'tsyringe'
import { UserRepositoryProps } from '../../repositories/UsersRepositoryProps'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from '@shared/infra/http/errors/appError'
import { UsersTokensRepositoryProps } from '@modules/accounts/repositories/UsersTokensRepositoryProps'
import auth from '@config/auth'
import { DateProviderProps } from '@shared/container/providers/DateProvider/InterfaceDateProvider'

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
    @inject('UsersTokensRepository')
    private usersTokensRepositorys: UsersTokensRepositoryProps,
    @inject('DayJsDateProvider')
    private dateProvider: DateProviderProps,
  ) {}

  async execute({ email, password }: AuthenticateUserUseCaseProps) {
    const user = await this.userRepository.findByEmail(email)
    const { expiresIn, refreshTokenSecret, secretToken } = auth

    if (!user) {
      throw new AppError('Email or password incorrect', 400)
    }

    const correctPassword = await compare(password, user.password)

    if (!correctPassword) {
      throw new AppError('Email or password incorrect!', 400)
    }

    const jwtToken = sign({}, secretToken, {
      subject: user.id,
      expiresIn,
    })

    const refreshTokenJWT = sign({ email }, refreshTokenSecret, {
      subject: user.id,
      expiresIn: '30d',
    })
    const expiresDateRefreshToken = this.dateProvider.addDays(30)

    const refreshToken = await this.usersTokensRepositorys.create({
      expires_date: expiresDateRefreshToken,
      refresh_token: refreshTokenJWT,
      user_id: user.id,
    })

    return { user, jwtToken, refreshToken }
  }
}
export { AuthenticateUserUseCase }
