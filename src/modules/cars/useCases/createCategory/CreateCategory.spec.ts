import { AppError } from '../../../../shared/infra/http/errors/appError'
import { InMemoryCategoriesRepository } from '../../repositories/inMemory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategory: CreateCategoryUseCase
let categoriesRepositoryInMemory: InMemoryCategoriesRepository
describe('Create Category useCase', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('should be able to create an category', async () => {
    await createCategory.execute({
      name: 'Category test',
      description: 'Category desc test',
    })

    const findCategory = await categoriesRepositoryInMemory.findByName(
      'Category test',
    )

    expect(findCategory).toHaveProperty('id')
  })

  it('should NOT be able to create a new category with same name', async () => {
    await expect(async () => {
      await createCategory.execute({
        name: 'Category test',
        description: 'Category desc test',
      })
      await createCategory.execute({
        name: 'Category test',
        description: 'Category desc test',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
