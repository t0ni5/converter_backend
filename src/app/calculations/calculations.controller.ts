import { Body, Controller, Get, Post } from '@nestjs/common';
import { CalculationsService } from './calculations.service';
import { CalculationDto } from './dto/calculation.dto';

@Controller('calculations')
export class CalculationsController {
  constructor(private readonly calculationsService: CalculationsService) {}

  @Post()
  async calculateCurrencies(@Body() CalculationDto: CalculationDto) {
    const result = await this.calculationsService.calculateValues(
      CalculationDto,
    );

    return result;
  }
}
