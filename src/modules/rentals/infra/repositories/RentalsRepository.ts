import { CreateRentalDTO } from '@modules/rentals/dtos/InterfaceCreateRentalDTO'
import { RentalRepositoryProps } from '@modules/rentals/repositories/InterfaceRentalRepositoryProps'
import { Rental } from '../entities/Rental'
import { Repository, getRepository } from 'typeorm'

export class RentalsRespository implements RentalRepositoryProps {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    })

    await this.repository.save(rental)
    return rental
  }

  async findCarById(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { car_id, end_date: null } })
  }

  async findRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ where: { user_id, end_date: null } })
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ id })
  }

  async listRentalsByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    })
  }
}
