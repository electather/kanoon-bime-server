import { ApiProperty } from '@nestjs/swagger';

export class StatDetailsDto {
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
  readonly date?: Date;

  constructor(
    totalValue: number,
    count: number,
    commissionPercentage: number,
    day?: Date,
  ) {
    this.totalValue = totalValue;
    this.commission = totalValue * commissionPercentage;
    this.count = count;
    this.avgCommission = this.commission / this.count;
    this.avgValue = this.totalValue / this.count;
    this.date = day;
  }
}
