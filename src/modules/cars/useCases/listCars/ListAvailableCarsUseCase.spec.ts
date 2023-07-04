import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'
let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe('List cars UseCase', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    )
  })

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'TestBrand',
      category_id: '123abc',
      daily_rate: 110.1,
      description: ' Car Description',
      fine_amount: 150,
      license_plate: '123AbcTest',
      name: 'Car Test',
    })
    const availableCars = await listAvailableCarsUseCase.execute({})
    expect(availableCars).toEqual([car])
  })
  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'TestBrandCar',
      category_id: '123abc',
      daily_rate: 110.1,
      description: ' Car Description',
      fine_amount: 150,
      license_plate: '123AbcTest',
      name: 'Car Test',
    })
    const availableCars = await listAvailableCarsUseCase.execute({
      brand: 'TestBrandCar',
    })
    expect(availableCars).toEqual([car])
  })
})
