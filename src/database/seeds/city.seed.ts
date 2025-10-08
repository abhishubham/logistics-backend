import { DataSource } from 'typeorm';
import { City } from '../entities/city.entity';
import { Country } from '../entities/country.entity';

export class CitySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const cityRepository = dataSource.getRepository(City);
    const countryRepository = dataSource.getRepository(Country);

    // Get countries first
    const usa = await countryRepository.findOne({
      where: { country_code: 'USA' },
    });
    const gbr = await countryRepository.findOne({
      where: { country_code: 'GBR' },
    });
    const deu = await countryRepository.findOne({
      where: { country_code: 'DEU' },
    });
    const fra = await countryRepository.findOne({
      where: { country_code: 'FRA' },
    });
    const jpn = await countryRepository.findOne({
      where: { country_code: 'JPN' },
    });

    if (!usa || !gbr || !deu || !fra || !jpn) {
      console.log('⚠️  Countries not found. Please run country seed first.');
      return;
    }

    const cities = [
      { city_name: 'New York', city_code: 'NYC', country_id: usa.country_id },
      {
        city_name: 'Los Angeles',
        city_code: 'LAX',
        country_id: usa.country_id,
      },
      { city_name: 'Chicago', city_code: 'CHI', country_id: usa.country_id },
      { city_name: 'London', city_code: 'LON', country_id: gbr.country_id },
      { city_name: 'Manchester', city_code: 'MAN', country_id: gbr.country_id },
      { city_name: 'Berlin', city_code: 'BER', country_id: deu.country_id },
      { city_name: 'Munich', city_code: 'MUC', country_id: deu.country_id },
      { city_name: 'Paris', city_code: 'PAR', country_id: fra.country_id },
      { city_name: 'Lyon', city_code: 'LYO', country_id: fra.country_id },
      { city_name: 'Tokyo', city_code: 'TYO', country_id: jpn.country_id },
      { city_name: 'Osaka', city_code: 'OSA', country_id: jpn.country_id },
    ];

    for (const cityData of cities) {
      const existingCity = await cityRepository.findOne({
        where: { city_code: cityData.city_code },
      });

      if (!existingCity) {
        const city = cityRepository.create(cityData);
        await cityRepository.save(city);
        console.log(`City ${cityData.city_name} created successfully`);
      }
    }
  }
}
