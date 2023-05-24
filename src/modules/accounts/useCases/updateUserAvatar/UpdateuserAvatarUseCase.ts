/*
- Adicionar Coluna Avatar na tabela Users
- Config upload mutler
- Refatorar o usuario com coluna AVATAR
- Criar regra de negocio & Controller do Upload

*/

import { inject, injectable } from 'tsyringe'
import { UserRepositoryProps } from '../../repositories/UsersRepositoryProps'
import { deleteFile } from '../../../../utils/file'

interface UpdateUserAvatarRequestProps {
  userId: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepositoryProps,
  ) {}

  async execute({
    avatarFile,
    userId,
  }: UpdateUserAvatarRequestProps): Promise<void> {
    const user = await this.usersRepository.findById(userId)
    /* Verificando se o avatar ja existe */
    if (user.avatar) {
      await deleteFile(`./temp/avatar/${user.avatar}`)
    }
    user.avatar = avatarFile

    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
