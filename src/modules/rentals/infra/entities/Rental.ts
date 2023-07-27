import { Car } from '@modules/cars/infra/typeorm/entities/Car'
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { v4 } from 'uuid'
@Entity('rentals')
export class Rental {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car

  @Column()
  car_id: string

  @Column()
  user_id: string

  @Column()
  start_date: Date

  @Column()
  end_date: Date

  @Column()
  expected_return_date: Date

  @Column()
  total: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}
