import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateSpecificationCars1688470053179
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_specification_car',
        /* Qual tabela referencia */
        referencedTableName: 'specifications',
        /* Qual nome do id na tabela referenciada */
        referencedColumnNames: ['id'],
        /* Qual nome da coluna na tabela atual */
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    )
    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_car_specification',
        /* Qual tabela referencia */
        referencedTableName: 'cars',
        /* Qual nome do id na tabela referenciada */
        referencedColumnNames: ['id'],
        /* Qual nome da coluna na tabela atual */
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_car_specification',
    )
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_specification_car',
    )
    await queryRunner.dropTable('specifications_cars')
  }
}
