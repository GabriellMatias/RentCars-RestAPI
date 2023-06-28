import { Category } from '../entities/Category'

export interface CreateCategorieProps {
  name: string
  description: string
}

interface CategoriesRepositoryProps {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: CreateCategorieProps): Promise<void>
}

export { CategoriesRepositoryProps }
