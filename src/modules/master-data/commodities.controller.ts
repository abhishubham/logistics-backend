import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreateCommodityDto } from './dto';

@ApiTags('Commodities')
@Controller('master/commodities')
export class CommoditiesController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createCommodity', summary: 'Create commodity' })
  @ApiBody({ type: CreateCommodityDto })
  create(@Body() body: CreateCommodityDto) { return this.service.createCommodity(body); }

  @Get()
  @ApiOperation({ operationId: 'listCommodities', summary: 'List commodities' })
  list() { return this.service.findAllCommodities(); }

  @Get(':id')
  @ApiOperation({ operationId: 'getCommodityById', summary: 'Get commodity by id' })
  getById(@Param('id', ParseIntPipe) id: number) { return this.service.findCommodityById(id); }
}


