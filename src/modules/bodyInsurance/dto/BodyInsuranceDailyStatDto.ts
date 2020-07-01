import { ApiProperty } from '@nestjs/swagger';

import { StatDetailsDto } from '../../../common/dto/DailyStatDto';

export class BodyInsuranceDailyStatDto {
  @ApiProperty({ type: () => StatDetailsDto })
  readonly dailyStats: StatDetailsDto[];
  constructor(
    rawDailyStats: { totalValue: string; count: string; day: Date }[],
  ) {
    this.dailyStats = rawDailyStats.map(
      (item) =>
        new StatDetailsDto(
          Number(item.totalValue),
          Number(item.count),
          0.06,
          item.day,
        ),
    );
  }
}
