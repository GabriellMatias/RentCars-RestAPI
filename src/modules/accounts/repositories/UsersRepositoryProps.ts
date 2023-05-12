import { UserProps } from '../@UserProps/UserProps'

export interface UserRepositoryProps {
  create(data: UserProps): Promise<void>
}
