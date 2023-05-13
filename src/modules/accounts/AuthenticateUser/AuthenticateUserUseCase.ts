import { inject, injectable } from 'tsyringe'
import { UserRepositoryProps } from '../repositories/UsersRepositoryProps'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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
      throw new Error('Email or password incorrect')
    }

    const correctPassword = await compare(password, user.password)

    console.log(password, user.password, correctPassword)


    if (!correctPassword) {
      throw new Error('Email or password incorrect!')
    }

    const jwtToken = sign({}, '759856cc8e350a731a254061b426c10a', {
      subject: user.id,
      expiresIn: '1d',
    })

    return { user, jwtToken }
  }
}
export { AuthenticateUserUseCase }
