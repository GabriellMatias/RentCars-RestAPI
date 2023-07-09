// import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'
import { v4 } from 'uuid'
// @Entity('rentals')
export class Rental {
  // @PrimaryColumn()
  id: string

  // @Column()
  car_id: string

  // @Column()
  user_id: string

  start_date: Date

  end_date: Date

  expected_return_date: Date
  // @Column()
  total: number

  // @CreateDateColumn()
  created_at: Date

  // @CreateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}
