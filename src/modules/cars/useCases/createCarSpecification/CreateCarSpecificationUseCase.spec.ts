import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
import { AppError } from '@shared/infra/http/errors/appError'
import { SpecificationInMemory } from '@modules/cars/repositories/inMemory/SpecificationInMemory'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let specificationRepositoryInMemory: SpecificationInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory,
    )
  })

  it('should create a car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      category_id: '12',
      daily_rate: 5,
      description: 'Car to Test',
      fine_amount: 25,
      license_plate: '123abc',
      name: 'Car',
    })

    const specification = await specificationRepositoryInMemory.create({
      description: 'test',
      name: 'test Spec',
    })
    const specification_id = [specification.id]

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    })

    expect(specificationCars).toHaveProperty('specifications')
    expect(specificationCars.specifications.length).toBe(1)
  })

  it('should not be able to add a specification to a non-exists car', async () => {
    await expect(async () => {
      const car_id = '123123'
      const specification_id = ['654654']

      await createCarSpecificationUseCase.execute({ car_id, specification_id })
    }).rejects.toBeInstanceOf(AppError)
  })
})
