import {
  CategoriesRepositoryProps,
  CreateCategorieProps,
} from '@modules/cars/repositories/InterfaceCategoriesRepository'
import { Repository, getRepository } from 'typeorm'
import { Category } from '../entities/Category'

class CategoriesRepository implements CategoriesRepositoryProps {
  private repository: Repository<Category>

  /* metodo principal que inicia a classe */
  constructor() {
    this.repository = getRepository(Category)
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository()
  //   }
  //   return CategoriesRepository.INSTANCE
  // }

  /* Metodo para criacao de uma categoria */
  async create({ description, name }: CreateCategorieProps) {
    const category = this.repository.create({
      name,
      description,
    })
    await this.repository.save(category)
  }

  /* Metodo de listagem de categoria */
  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: { name },
    })
    return category
  }
}

export { CategoriesRepository }
