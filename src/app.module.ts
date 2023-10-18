import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './app/currencies/currencies.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ========== config ==========
import app_config from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/data-source';
import { CalculationsModule } from './app/calculations/calculations.module';

@Module({
  imports: [
    CurrenciesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [app_config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CalculationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
