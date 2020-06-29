import { ApiProperty } from '@nestjs/swagger';

import { DailyStatDto } from '../../../common/dto/DailyStatDto';

export class ThirdPartyDailyStatDto {
  @ApiProperty({ type: () => DailyStatDto })
  readonly dailyStats: DailyStatDto[];
  constructor(
    rawDailyStats: { totalValue: string; count: string; day: Date }[],
  ) {
    this.dailyStats = rawDailyStats.map(
      (item) =>
        new DailyStatDto(Number(item.totalValue), Number(item.count), item.day),
    );
  }
}
