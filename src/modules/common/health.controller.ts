import { Controller, Get } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from '../../common/dto/api-response.dto';

// @ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  // @ApiOperation({
  //   summary: 'Health check',
  //   description: 'Check the health status of the API server',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Health check successful',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Success',
  //       data: {
  //         status: 'ok',
  //         timestamp: '2023-01-01T00:00:00.000Z',
  //         uptime: 12345.67,
  //         environment: 'development',
  //         version: '1.0.0',
  //       },
  //     },
  //   },
  // })
  check() {
    return ApiResponseDto.success({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.APP_VERSION || '1.0.0',
    });
  }
}
