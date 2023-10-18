import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiCurrencyListEntity } from '../entities/api-currency-list.entity';
import { CurrencyEntity } from '../entities/currency.entity';
import { ApiCurrencyDto } from '../dto/api-currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class CurrenciesRepo {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
    private readonly httpService: HttpService,
  ) {}

  async getAllFromApi() {
    try {
      const response =
        await this.httpService.axiosRef.get<ApiCurrencyListEntity>('/live', {
          params: { access_key: process.env.ACCESS_KEY },
        });
      return response.data;
    } catch (err) {
      throw new HttpException(
        'Can not send request to API to get currencies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addCurrenciesToDB(dtos: ApiCurrencyDto[]) {
    try {
      const currenciesInDb = await this.getAllCurrencies();

      if (currenciesInDb.length > 0) {
        return [];
      }

      const newCurrencies = dtos.map((dto) => {
        const currency = new CurrencyEntity();
        currency.name = dto.name;
        currency.rateToUSD = dto.rateToUSD;
        currency.created = new Date();
        currency.updated = new Date();
        return currency;
      });

      await this.currencyRepository.save(newCurrencies);
      return newCurrencies;
    } catch (error) {
      throw new HttpException(
        'Internal server error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCurrencies(calculationDto?: string[]) {
    try {
      const currencies = await this.currencyRepository.find({
        where: {
          name: In([...calculationDto]),
        },
      });

      if (!currencies || currencies.length === 0) {
        throw new NotFoundException(`Currencies not found`);
      }

      return currencies;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal server error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAllCurrencies() {
    try {
      const currencies = await this.currencyRepository.find({});

      return currencies;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal server error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
