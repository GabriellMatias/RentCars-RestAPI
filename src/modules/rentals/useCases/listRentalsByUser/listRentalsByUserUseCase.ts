import { Rental } from '@modules/rentals/infra/entities/Rental'
import { RentalRepositoryProps } from '@modules/rentals/repositories/InterfaceRentalRepositoryProps'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ListRentalsByUserUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalRepositoryProps,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.listRentalsByUser(
      user_id,
    )
    return rentalsByUser
  }
}
