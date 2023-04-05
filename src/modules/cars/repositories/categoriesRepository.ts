import { Category } from '../model/Category'
import {
  CategoriesRepositoryProps,
  CreateCategorieProps,
} from '../repositories/implementations/InterfaceCategoriesRepository'

class CategoriesRepository implements CategoriesRepositoryProps {
  private categories: Category[]
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository

  /* metodo principal que inicia a classe */
  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
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
