import { CreateRentalDTO } from '../dtos/InterfaceCreateRentalDTO'
import { Rental } from '../infra/entities/Rental'

export interface RentalRepositoryProps {
  create(data: CreateRentalDTO): Promise<Rental>
  findCarById(car_id: string): Promise<Rental>
  findRentalByUser(user_id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  listRentalsByUser(user_id: string): Promise<Rental[]>
}
