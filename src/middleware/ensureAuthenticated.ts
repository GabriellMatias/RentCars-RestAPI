import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UsersRepository } from '../modules/accounts/implementations/UsersRepository'
import { AppError } from '../errors/appError'

interface TokenProps {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token Missing!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(
      token,
      '759856cc8e350a731a254061b426c10a',
    ) as TokenProps

    const usersRepository = new UsersRepository()

    const user = await usersRepository.findById(sub)
    if (!user) {
      throw new AppError('User doesnt exists', 400)
    }

    request.user = {
      id: sub,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid Token!', 401)
  }
}
