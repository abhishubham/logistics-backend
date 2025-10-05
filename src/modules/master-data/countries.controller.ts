import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreateCountryDto } from './dto';

@ApiTags('Countries')
@Controller('master/countries')
export class CountriesController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createCountry', summary: 'Create country' })
  @ApiBody({ type: CreateCountryDto })
  create(@Body() body: CreateCountryDto) {
    return this.service.createCountry(body);
  }

  @Get()
  @ApiOperation({ operationId: 'listCountries', summary: 'List countries' })
  list() {
    return this.service.findAllCountries();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getCountryById', summary: 'Get country by id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findCountryById(id);
  }
}


