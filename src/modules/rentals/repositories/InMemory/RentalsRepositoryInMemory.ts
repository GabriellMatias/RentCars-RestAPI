import { Rental } from '@modules/rentals/infra/entities/Rental'
import { RentalRepositoryProps } from '../InterfaceRentalRepositoryProps'
import { CreateRentalDTO } from '@modules/rentals/dtos/InterfaceCreateRentalDTO'

export class RentalsRepositoryInMemory implements RentalRepositoryProps {
  rentals: Rental[] = []

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental)
    return rental
  }

  async findCarById(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    )
  }

  async findRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    )
  }
}
