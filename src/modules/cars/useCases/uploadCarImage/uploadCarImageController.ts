import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImageUseCase } from './uploadCarImageUseCase'

interface FileProps {
  fileName: string
}

export class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const images = request.files as unknown as FileProps[]
    const fileName = images.map((file) => file.fileName)
    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)

    await uploadCarImageUseCase.execute({
      car_id: id,
      image_name: fileName,
    })
    return response.status(201).send()
  }
}
