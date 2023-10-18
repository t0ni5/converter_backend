import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CalculationDto } from './dto/calculation.dto';
import { CurrenciesService } from 'app/currencies/currencies.service';
import { CurrencyDto } from 'app/currencies/dto/currency.dto';

@Injectable()
export class CalculationsService {
  constructor(private readonly currenciesService: CurrenciesService) {}
  async calculateValues(calculationDto: CalculationDto) {
    try {
      const { calculationData, targetValue } = calculationDto;

      if (targetValue === '') {
        return;
      }

      const currencies = calculationData.map((currency) => currency.name);

      const entitiesFromDB = await this.currenciesService.getCurrencies(
        currencies,
      );

      const currenciesFromDB = CurrencyDto.fromEntities(entitiesFromDB);

      const targetCurrencyFromDB =
        targetValue !== ' USD'
          ? currenciesFromDB.find((currency) => {
              return currency.name === targetValue;
            })
          : null;

      const valueInUsd =
        targetValue === 'USD'
          ? calculationData.find((currency) => currency.name === targetValue)
              .value
          : calculationData.find((currency) => currency.name === targetValue)
              .value / targetCurrencyFromDB.rateToUSD;

      const result = currenciesFromDB.map((currency) => {
        const calculatedValue = valueInUsd * currency.rateToUSD;
        return { name: currency.name, value: calculatedValue };
      });
      const resultData = {
        calculationData: [...result, { name: 'USD', value: valueInUsd }],
        targetValue,
      };

      resultData.calculationData.sort((a, b) => {
        return (
          calculationData.findIndex((item) => item.name === a.name) -
          calculationData.findIndex((item) => item.name === b.name)
        );
      });

      return resultData;
    } catch (error) {
      throw new HttpException(
        'Cannot proceed with calculations',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
