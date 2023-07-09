import { Rental } from '@modules/rentals/infra/entities/Rental'
import { RentalRepositoryProps } from '@modules/rentals/repositories/InterfaceRentalRepositoryProps'
import { AppError } from '@shared/infra/http/errors/appError'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

interface RequestProps {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private rentalsRepository: RentalRepositoryProps) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: RequestProps): Promise<Rental> {
    const unAvailableCar = await this.rentalsRepository.findCarById(car_id)
    if (unAvailableCar) {
      throw new AppError('Car is Unavailable')
    }

    const userRentals = await this.rentalsRepository.findRentalByUser(user_id)

    if (userRentals) {
      throw new AppError('This user already have an rental in progress')
    }

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format()

    const todayDate = dayjs(new Date()).utc().local().format()

    const compareDates = dayjs(expectedReturnDateFormat).diff(
      todayDate,
      'hours',
    )
    const minRentalHours = 24
    if (compareDates < minRentalHours) {
      throw new AppError('Rental should have at least 24 hours of duration')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })
    return rental
  }
}
