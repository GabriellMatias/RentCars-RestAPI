import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './createRentalUseCase'
import { AppError } from '@shared/infra/http/errors/appError'
import dayjs from 'dayjs'

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {
  const tomorrowDate = dayjs().add(1, 'day').toDate()

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
  })
  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123',
      user_id: '123123',
      expected_return_date: tomorrowDate,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('Should not be able to create a new rental if there`s another rental opne to the same user', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'TestingHere',
        user_id: '123123',
        expected_return_date: tomorrowDate,
      })
      await createRentalUseCase.execute({
        car_id: 'TestingHere',
        user_id: '123123',
        expected_return_date: tomorrowDate,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new rental if there`s another rental open to the same car', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: 'TestingHere',
        expected_return_date: tomorrowDate,
      })
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: 'TestingHere',
        expected_return_date: tomorrowDate,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('Should not be able to create a new rental with less than 24 hours rental', async () => {
    await expect(async () => {
      await createRentalUseCase.execute({
        car_id: '123',
        user_id: 'TestingHere',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
