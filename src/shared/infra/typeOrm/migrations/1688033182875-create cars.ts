import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCars1688033182875 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'is_avalible',
            type: 'boolean',
            default: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fK_cars_categories',
            /* Qual tabela referencia */
            referencedTableName: 'categories',
            /* Qual nome do id na tabela referenciada */
            referencedColumnNames: ['id'],
            /* Qual nome da coluna na tabela atual */
            columnNames: ['category_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars')
  }
}
