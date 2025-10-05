import { IsOptional, IsPositive, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
// import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  // @ApiPropertyOptional({
  //   description: 'Page number for pagination',
  //   minimum: 1,
  //   default: 1,
  //   example: 1,
  // })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  // @ApiPropertyOptional({
  //   description: 'Number of items per page',
  //   minimum: 1,
  //   maximum: 100,
  //   default: 10,
  //   example: 10,
  // })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // @ApiPropertyOptional({
  //   description: 'Search term to filter results',
  //   example: 'john',
  // })
  @IsOptional()
  @IsString()
  search?: string;

  // @ApiPropertyOptional({
  //   description: 'Field to sort by',
  //   example: 'createdAt',
  // })
  @IsOptional()
  @IsString()
  sortBy?: string;

  // @ApiPropertyOptional({
  //   description: 'Sort order',
  //   enum: ['ASC', 'DESC'],
  //   default: 'DESC',
  //   example: 'DESC',
  // })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}