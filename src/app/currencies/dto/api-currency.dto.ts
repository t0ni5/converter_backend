import { IsString, IsNumber } from 'class-validator';
import { ApiCurrencyListEntity } from '../entities/api-currency-list.entity';

export class ApiCurrencyDto {
  @IsString()
  name: string;

  @IsNumber()
  rateToUSD: number;

  public static fromEntity(entity: ApiCurrencyListEntity) {
    const currenciesFromEntity = entity.quotes;

    const dtoList: ApiCurrencyDto[] = Object.keys(currenciesFromEntity).map(
      (key) => {
        return { name: key.substring(3), rateToUSD: currenciesFromEntity[key] };
      },
    );

    return dtoList;
  }
}
