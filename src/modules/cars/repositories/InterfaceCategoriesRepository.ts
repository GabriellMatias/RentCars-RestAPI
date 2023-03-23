import { Category } from '../model/Category'

export interface CreateCategorieProps {
  name: string
  description: string
}

interface CategoriesRepositoryProps {
  findByName(name: string): Category
  list(): Category[]
  create({ name, description }: CreateCategorieProps): void
}

export { CategoriesRepositoryProps }
