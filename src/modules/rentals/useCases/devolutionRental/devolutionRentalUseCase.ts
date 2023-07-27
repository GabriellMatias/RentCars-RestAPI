import { CarRepositoryProps } from '@modules/cars/repositories/InterfaceCarRepository'
import { RentalRepositoryProps } from '@modules/rentals/repositories/InterfaceRentalRepositoryProps'
import { DateProviderProps } from '@shared/container/providers/DateProvider/InterfaceDateProvider'
import { AppError } from '@shared/infra/http/errors/appError'
import { inject, injectable } from 'tsyringe'

interface RequestProps {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalRepositoryProps,
    @inject('CarsRepository')
    private carsRepository: CarRepositoryProps,
    @inject('DayJsDateProvider')
    private dateProvider: DateProviderProps,
  ) {}

  async execute({ id, user_id }: RequestProps) {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    if (!rental) {
      throw new AppError('Rental doesnt exists ❌')
    }

    const todayDate = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    )

    const minDaily = 1
    if (daily <= 0) {
      daily = minDaily
    }

    const delay = this.dateProvider.compareInDays(
      todayDate,
      rental.expected_return_date,
    )

    let total = 0
    if (daily > 0) {
      const trafficTicket = delay * car.fine_amount
      total = trafficTicket
    }

    total += daily * car.daily_rate

    // Atualizando a data de termino da devolucao do rental e tambem o total se houver multa
    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    // atualizando todas as infos no repository
    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
