import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCarImages1688561529747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'CarsImage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_car_image',
            /* Qual tabela referencia */
            referencedTableName: 'cars',
            /* Qual nome do id na tabela referenciada */
            referencedColumnNames: ['id'],
            /* Qual nome da coluna na tabela atual */
            columnNames: ['car_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('CarsImage')
  }
}
