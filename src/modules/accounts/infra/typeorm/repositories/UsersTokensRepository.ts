import { CreateUserTokenProps } from '@modules/accounts/@UserProps/UserTokensProps'
import { UsersTokensRepositoryProps } from '@modules/accounts/repositories/UsersTokensRepositoryProps'
import { UserTokens } from '../entities/UserTokens'
import { Repository, getRepository } from 'typeorm'

export class UsersTokenRepository implements UsersTokensRepositoryProps {
  private repository: Repository<UserTokens>
  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokenProps): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }
}
