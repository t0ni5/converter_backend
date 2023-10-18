import { IsNumber, IsString } from 'class-validator';
import { UUIDEntity } from '../../../shared/entities/uuid.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class CurrencyEntity extends UUIDEntity {
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @Column({ type: 'decimal' })
  @IsNumber()
  rateToUSD: number;
}
