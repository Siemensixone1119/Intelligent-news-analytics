import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class CursorPaginationDto {
  @ApiPropertyOptional({
    description: 'Количество новостей на странице',
    example: 10,
    default: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string' || !/^[0-9]+$/.test(value)) {
      return NaN;
    }

    return Number(value);
  })
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'UUID последней записи предыдущей страницы',
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  cursor?: string;

    source?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}
