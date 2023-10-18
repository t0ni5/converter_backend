import { Module } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationsController } from './calculations.controller';

import { CurrenciesModule } from 'app/currencies/currencies.module';

@Module({
  imports: [CurrenciesModule],
  controllers: [CalculationsController],
  providers: [CalculationsService],
})
export class CalculationsModule {}
