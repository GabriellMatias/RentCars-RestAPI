import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './createCarUseCase'
import { AppError } from '@shared/infra/http/errors/appError'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car UseCase', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('Should be able to create a new car', async () => {
    await createCarUseCase.execute({
      brand: 'brand',
      category_id: '12',
      daily_rate: 5,
      description: 'Car to Test',
      fine_amount: 25,
      license_plate: '123abc',
      name: 'Car',
    })
  })

  it('Not Should be able to create a new car with an existing plate', async () => {
    await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'asda',
      daily_rate: 5,
      description: 'Car to Test',
      fine_amount: 25,
      license_plate: '123abc',
      name: 'Car',
    })

    await expect(
      createCarUseCase.execute({
        brand: 'brand',
        category_id: 'asda',
        daily_rate: 5,
        description: 'Car to Test',
        fine_amount: 25,
        license_plate: '123abc',
        name: 'Car',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
