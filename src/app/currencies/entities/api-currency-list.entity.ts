import { Entity } from 'typeorm';
import { IsBoolean, IsString, IsUrl } from 'class-validator';
import { UUIDEntity } from 'shared/entities/uuid.entity';

@Entity({ synchronize: false })
export class ApiCurrencyListEntity extends UUIDEntity {
  @IsBoolean()
  success: boolean;

  @IsUrl()
  @IsString()
  terms: string;

  @IsUrl()
  @IsString()
  privacy: string;

  @IsString()
  timestamp: string;

  @IsString()
  source: string;

  quotes: Record<string, number>;
}
