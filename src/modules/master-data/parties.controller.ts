import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MasterDataService } from './master-data.service';
import { CreatePartyDto } from './dto';

@ApiTags('Parties')
@Controller('master/parties')
export class PartiesController {
  constructor(private readonly service: MasterDataService) {}

  @Post()
  @ApiOperation({ operationId: 'createParty', summary: 'Create party' })
  @ApiBody({ type: CreatePartyDto })
  create(@Body() body: CreatePartyDto) { return this.service.createParty(body); }

  @Get()
  @ApiOperation({ operationId: 'listParties', summary: 'List parties' })
  list() { return this.service.findAllParties(); }

  @Get(':id')
  @ApiOperation({ operationId: 'getPartyById', summary: 'Get party by id' })
  getById(@Param('id', ParseIntPipe) id: number) { return this.service.findPartyById(id); }
}


