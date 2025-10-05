// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  // @ApiProperty({
  //   description: 'Indicates if the request was successful',
  //   example: true,
  // })
  success: boolean;

  // @ApiProperty({
  //   description: 'Response message',
  //   example: 'Operation completed successfully',
  // })
  message: string;

  // @ApiPropertyOptional({
  //   description: 'Response data payload',
  // })
  data?: T;

  // @ApiPropertyOptional({
  //   description: 'Pagination metadata',
  //   type: 'object',
  //   properties: {
  //     page: { type: 'number', example: 1 },
  //     limit: { type: 'number', example: 10 },
  //     total: { type: 'number', example: 100 },
  //     totalPages: { type: 'number', example: 10 },
  //   },
  // })
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };

  // @ApiPropertyOptional({
  //   description: 'Array of error messages',
  //   type: [String],
  //   example: ['Validation failed', 'Invalid input'],
  // })
  errors?: string[];

  constructor(
    success: boolean,
    message: string,
    data?: T,
    meta?: any,
    errors?: string[],
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.errors = errors;
  }

  static success<T>(data: T, message = 'Success'): ApiResponseDto<T> {
    return new ApiResponseDto(true, message, data);
  }

  static error(message: string, errors?: string[]): ApiResponseDto {
    return new ApiResponseDto(false, message, undefined, undefined, errors);
  }

  static paginated<T>(
    data: T[],
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    },
    message = 'Success',
  ): ApiResponseDto<T[]> {
    return new ApiResponseDto(true, message, data, meta);
  }
}