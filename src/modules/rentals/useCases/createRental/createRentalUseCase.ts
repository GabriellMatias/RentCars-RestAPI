import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { Rental } from '@modules/rentals/infra/entities/Rental'
import { RentalRepositoryProps } from '@modules/rentals/repositories/InterfaceRentalRepositoryProps'
import { DateProviderProps } from '@shared/container/providers/DateProvider/InterfaceDateProvider'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalRepositoryProps,
    @inject('DayJsDateProvider')
    private dateProvider: DateProviderProps,
    @inject('CarsRepository')
    private carsRepository: CarRepositoryProps,
  ) {}

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

    const todayDate = this.dateProvider.dateNow()
    const compareDates = this.dateProvider.compareInHours(
      todayDate,
      expected_return_date,
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

    // definindo status de disponibilidade do carro como false
    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}
