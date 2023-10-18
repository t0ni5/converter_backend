import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrencyDto } from './dto/currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  async loadCurrenciesToDB() {
    const entities = await this.currenciesService.loadCurrencies();

    return entities || [];
  }

  @Get('getAll')
  async getAllCurrencies() {
    const entities = await this.currenciesService.getAllCurrencies();
    const currencies = CurrencyDto.fromEntities(entities);
    return currencies || [];
  }
}
