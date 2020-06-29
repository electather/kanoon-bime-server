import { ApiProperty } from '@nestjs/swagger';

export class BodyInsuranceTotalStatDto {
  @ApiProperty()
  readonly totalValue: number;

  @ApiProperty()
  readonly commission: number;

  @ApiProperty()
  readonly avgValue: number;

  @ApiProperty()
  readonly avgCommission: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly startDate?: Date;

  @ApiProperty()
  readonly endDate?: Date;

  constructor(
    totalValue: number,
    count: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    this.totalValue = totalValue;
    this.commission = totalValue * 0.06;
    this.count = count;
    this.avgCommission = this.commission / this.count;
    this.avgValue = this.totalValue / this.count;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
