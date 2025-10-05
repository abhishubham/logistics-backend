import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country, City, PortAirport, Carrier, Commodity, Party } from '../../database/entities';

@Injectable()
export class MasterDataService {
  constructor(
    @InjectRepository(Country) private readonly countryRepo: Repository<Country>,
    @InjectRepository(City) private readonly cityRepo: Repository<City>,
    @InjectRepository(PortAirport) private readonly portAirportRepo: Repository<PortAirport>,
    @InjectRepository(Carrier) private readonly carrierRepo: Repository<Carrier>,
    @InjectRepository(Commodity) private readonly commodityRepo: Repository<Commodity>,
    @InjectRepository(Party) private readonly partyRepo: Repository<Party>,
  ) {}

  // Countries
  createCountry(data: Partial<Country>) { return this.countryRepo.save(this.countryRepo.create(data)); }
  findAllCountries() { return this.countryRepo.find(); }
  findCountryById(country_id: number) { return this.countryRepo.findOne({ where: { country_id } }); }

  // Cities
  createCity(data: Partial<City>) { return this.cityRepo.save(this.cityRepo.create(data)); }
  findAllCities() { return this.cityRepo.find(); }
  findCityById(city_id: number) { return this.cityRepo.findOne({ where: { city_id } }); }

  // Ports/Airports
  createPortAirport(data: Partial<PortAirport>) { return this.portAirportRepo.save(this.portAirportRepo.create(data)); }
  findAllPortsAirports() { return this.portAirportRepo.find(); }
  findPortAirportById(port_id: number) { return this.portAirportRepo.findOne({ where: { port_id } }); }

  // Carriers
  createCarrier(data: Partial<Carrier>) { return this.carrierRepo.save(this.carrierRepo.create(data)); }
  findAllCarriers() { return this.carrierRepo.find(); }
  findCarrierById(carrier_id: number) { return this.carrierRepo.findOne({ where: { carrier_id } }); }

  // Commodities
  createCommodity(data: Partial<Commodity>) { return this.commodityRepo.save(this.commodityRepo.create(data)); }
  findAllCommodities() { return this.commodityRepo.find(); }
  findCommodityById(commodity_id: number) { return this.commodityRepo.findOne({ where: { commodity_id } }); }

  // Parties
  createParty(data: Partial<Party>) { return this.partyRepo.save(this.partyRepo.create(data)); }
  findAllParties() { return this.partyRepo.find(); }
  findPartyById(party_id: number) { return this.partyRepo.findOne({ where: { party_id } }); }
}


