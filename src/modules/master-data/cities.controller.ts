import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreateCityDto } from './dto';

@ApiTags('Cities')
@Controller('master/cities')
export class CitiesController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createCity', summary: 'Create city' })
  @ApiBody({ type: CreateCityDto })
  create(@Body() body: CreateCityDto) { return this.service.createCity(body); }

  @Get()
  @ApiOperation({ operationId: 'listCities', summary: 'List cities' })
  list() { return this.service.findAllCities(); }

  @Get(':id')
  @ApiOperation({ operationId: 'getCityById', summary: 'Get city by id' })
  getById(@Param('id', ParseIntPipe) id: number) { return this.service.findCityById(id); }
}


