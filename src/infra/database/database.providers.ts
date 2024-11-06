import { Passenger } from 'src/models/passenger/entities/passenger.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost', //process.env.DATABASE_HOST,
  username: 'myuser', //process.env.DATABASE_USERNAME,
  password: 'password', //process.env.DATABASE_PASSWORD,
  database: 'TaxiRacing', // process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
  synchronize: false,
  logging: true,
  entities: [Passenger],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
