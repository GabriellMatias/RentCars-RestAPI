interface UserProps {
  name: string
  username: string
  email: string
  password: string
  driver_license: string
}

export interface UserRepositoryProps {
  create(data: UserProps): Promise<void>
}
