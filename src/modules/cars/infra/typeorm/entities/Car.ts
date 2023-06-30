import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

// @Entity('cars')
export class Car {
  // @PrimaryColumn()
  id: string

  // @Column()
  name: string

  // @Column()
  description: string

  // @Column()
  daily_rate: number

  // @Column()
  available: boolean

  // @Column()
  license_plate: string

  // @Column()
  fine_amount: number

  // @Column()
  brand: number

  // @Column()
  category_id: string

  // @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
