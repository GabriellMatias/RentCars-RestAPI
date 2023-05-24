import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserAvatarUseCase } from './UpdateuserAvatarUseCase'

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase)
    const avatarFile = request.file.filename
    await updateUserAvatarUseCase.execute({ userId: id, avatarFile })
    return response.status(204).send({ message: 'Avatar Create sucessfully' })
  }
}

export { UpdateUserAvatarController }
