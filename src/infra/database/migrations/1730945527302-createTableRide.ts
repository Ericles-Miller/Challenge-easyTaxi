import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableRide1730945527302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ride',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['WAIT', 'IN_PROGRESS', 'FINISHED', 'CANCELLED'],
            enumName: 'ride_status_enum',
            default: `'WAIT'`,
          },
          {
            name: 'origin',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'destination',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'startedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'finishedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'real',
          },
          {
            name: 'passengerId',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'driverId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ride',
      new TableForeignKey({
        columnNames: ['driverId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'driver',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ride',
      new TableForeignKey({
        columnNames: ['passengerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'passenger',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('classSoftware');
    const driverForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('driverId') !== -1);
    const passengerForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('passengerId') !== -1);

    if (driverForeignKey) await queryRunner.dropForeignKey('ride', driverForeignKey);
    if (passengerForeignKey) await queryRunner.dropForeignKey('ride', passengerForeignKey);

    await queryRunner.dropTable('ride');
  }
}
