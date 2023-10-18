import { IsString, IsNumber } from 'class-validator';
import { CurrencyEntity } from '../entities/currency.entity';

export class CurrencyDto {
  @IsString()
  name: string;

  @IsNumber()
  rateToUSD: number;

  public static fromEntity(entity: CurrencyEntity) {
    if (!entity) {
      return;
    }

    const dto = new CurrencyDto();
    dto.name = entity.name;
    dto.rateToUSD = entity.rateToUSD;

    return dto;
  }

  public static fromEntities(entities: CurrencyEntity[]) {
    if (!entities?.map) {
      return;
    }

    return entities.map((entity) => this.fromEntity(entity));
  }
}
