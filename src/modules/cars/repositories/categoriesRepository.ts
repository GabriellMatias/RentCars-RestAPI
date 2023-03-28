import { Category } from '../model/Category'
import {
  CategoriesRepositoryProps,
  CreateCategorieProps,
} from './InterfaceCategoriesRepository'

class CategoriesRepository implements CategoriesRepositoryProps {
  private categories: Category[]

  /* metodo principal que inicia a classe */
  constructor() {
    this.categories = []
  }

  /* Metodo para criacao de uma categoria */
  create({ description, name }: CreateCategorieProps) {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  /* Metodo de listagem de categoria */
  list(): Category[] {
    return this.categories
  }

  findByName(name: string) {
    const category = this.categories.find((c) => c.name === name)
    return category
  }
}

export { CategoriesRepository }