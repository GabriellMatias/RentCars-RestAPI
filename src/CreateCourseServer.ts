/*
name- string
duracao-number
educator - string 
*/
interface CourseProps {
  name: string
  duration?: number
  educator: string
}

class CreateCourseService {
  execute({ name, duration, educator }: CourseProps) {
    console.log(name, duration, educator)
  }
}
export default new CreateCourseService()
