import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity('cars_image')
export class CarsImage {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }
  }
}
