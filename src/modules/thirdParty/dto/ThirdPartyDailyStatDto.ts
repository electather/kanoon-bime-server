import { ApiProperty } from '@nestjs/swagger';

import { StatDetailsDto } from '../../../common/dto/DailyStatDto';

export class ThirdPartyDailyStatDto {
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
          0.03,
          item.day,
        ),
    );
  }
}
