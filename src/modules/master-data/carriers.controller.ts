import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreateCarrierDto } from './dto';

@ApiTags('Carriers')
@Controller('master/carriers')
export class CarriersController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createCarrier', summary: 'Create carrier' })
  @ApiBody({ type: CreateCarrierDto })
  create(@Body() body: CreateCarrierDto) { return this.service.createCarrier(body); }

  @Get()
  @ApiOperation({ operationId: 'listCarriers', summary: 'List carriers' })
  list() { return this.service.findAllCarriers(); }

  @Get(':id')
  @ApiOperation({ operationId: 'getCarrierById', summary: 'Get carrier by id' })
  getById(@Param('id', ParseIntPipe) id: number) { return this.service.findCarrierById(id); }
}


