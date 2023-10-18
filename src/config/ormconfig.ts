import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const TypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    name: 'ormconfig',
    type: 'postgres',
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
  };
};
