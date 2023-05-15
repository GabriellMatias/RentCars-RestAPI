import { UserProps } from '../@UserProps/UserProps'
import { User } from '../entities/User'

export interface UserRepositoryProps {
  create(data: UserProps): Promise<void>
  findByEmail(email: string): Promise<User>
  findById(id: string): Promise<User>
}
