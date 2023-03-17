import { Request, Response } from 'express'
import CreateCourseServer from './CreateCourseServer'

export function createCourse(request: Request, response: Response) {
  CreateCourseServer.execute({
    name: 'NodeJS',
    duration: 10,
    educator: 'Matias',
  })
  return response.send()
}
