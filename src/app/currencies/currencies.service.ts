import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrenciesRepo } from './repo/currencies.repo';
import { ApiCurrencyDto } from './dto/api-currency.dto';
import { CalculationDto } from 'app/calculations/dto/calculation.dto';

@Injectable()
export class CurrenciesService {
  constructor(private readonly repo_currencies: CurrenciesRepo) {}
  async loadCurrencies() {
    const data = await this.repo_currencies.getAllFromApi();
    const apiCurrencyDto = ApiCurrencyDto.fromEntity(data);
    await this.repo_currencies.addCurrenciesToDB(apiCurrencyDto);
    return await this.getAllCurrencies();
  }

  async getCurrencies(calculationDto?: string[]) {
    return await this.repo_currencies.getCurrencies(calculationDto);
  }

  async getAllCurrencies() {
    return await this.repo_currencies.getAllCurrencies();
  }
}
