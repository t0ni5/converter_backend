import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';

export class CalculationCurrency {
  @IsString()
  name: string;

  @IsNumber()
  value: number;
}

export class CalculationDto {
  @ValidateNested()
  @IsNotEmpty()
  calculationData: CalculationCurrency[];

  @IsString()
  targetValue: string;
}
