import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country, City, PortAirport, Carrier, Commodity, Party } from '../../database/entities';
import { MasterDataService } from '@/modules/master-data/master-data.service';
import { CountriesController } from '@/modules/master-data/countries.controller';
import { CitiesController } from '@/modules/master-data/cities.controller';
import { PortsAirportsController } from '@/modules/master-data/ports-airports.controller';
import { CarriersController } from '@/modules/master-data/carriers.controller';
import { CommoditiesController } from '@/modules/master-data/commodities.controller';
import { PartiesController } from '@/modules/master-data/parties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City, PortAirport, Carrier, Commodity, Party])],
  controllers: [CountriesController, CitiesController, PortsAirportsController, CarriersController, CommoditiesController, PartiesController],
  providers: [MasterDataService],
})
export class MasterDataModule {}


