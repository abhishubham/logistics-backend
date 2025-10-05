import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreatePortAirportDto } from './dto';

@ApiTags('Ports/Airports')
@Controller('master/ports-airports')
export class PortsAirportsController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createPortAirport', summary: 'Create port/airport' })
  @ApiBody({ type: CreatePortAirportDto })
  create(@Body() body: CreatePortAirportDto) { return this.service.createPortAirport(body); }

  @Get()
  @ApiOperation({ operationId: 'listPortsAirports', summary: 'List ports/airports' })
  list() { return this.service.findAllPortsAirports(); }

  @Get(':id')
  @ApiOperation({ operationId: 'getPortAirportById', summary: 'Get port/airport by id' })
  getById(@Param('id', ParseIntPipe) id: number) { return this.service.findPortAirportById(id); }
}


