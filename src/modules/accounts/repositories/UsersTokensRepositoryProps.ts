import { CreateUserTokenProps } from '../@UserProps/UserTokensProps'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface UsersTokensRepositoryProps {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokenProps): Promise<UserTokens>
}
