import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesRepo } from './repo/currencies.repo';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './entities/currency.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({ baseURL: process.env.CURRENCIES_API }),
    TypeOrmModule.forFeature([CurrencyEntity]),
  ],
  exports: [CurrenciesService],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, CurrenciesRepo],
})
export class CurrenciesModule {}
