import { DataSource } from 'typeorm';
import { Country } from '../entities/country.entity';

export class CountrySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const countryRepository = dataSource.getRepository(Country);

    const countries = [
      {
        country_name: 'United States',
        country_code: 'USA',
        capital: 'Washington D.C.',
        currency: 'USD',
        language: 'English',
      },
      {
        country_name: 'United Kingdom',
        country_code: 'GBR',
        capital: 'London',
        currency: 'GBP',
        language: 'English',
      },
      {
        country_name: 'Germany',
        country_code: 'DEU',
        capital: 'Berlin',
        currency: 'EUR',
        language: 'German',
      },
      {
        country_name: 'France',
        country_code: 'FRA',
        capital: 'Paris',
        currency: 'EUR',
        language: 'French',
      },
      {
        country_name: 'Japan',
        country_code: 'JPN',
        capital: 'Tokyo',
        currency: 'JPY',
        language: 'Japanese',
      },
      {
        country_name: 'China',
        country_code: 'CHN',
        capital: 'Beijing',
        currency: 'CNY',
        language: 'Chinese',
      },
      {
        country_name: 'India',
        country_code: 'IND',
        capital: 'New Delhi',
        currency: 'INR',
        language: 'Hindi',
      },
      {
        country_name: 'Canada',
        country_code: 'CAN',
        capital: 'Ottawa',
        currency: 'CAD',
        language: 'English',
      },
      {
        country_name: 'Australia',
        country_code: 'AUS',
        capital: 'Canberra',
        currency: 'AUD',
        language: 'English',
      },
      {
        country_name: 'Brazil',
        country_code: 'BRA',
        capital: 'Brasília',
        currency: 'BRL',
        language: 'Portuguese',
      },
    ];

    for (const countryData of countries) {
      const existingCountry = await countryRepository.findOne({
        where: { country_code: countryData.country_code },
      });

      if (!existingCountry) {
        const country = countryRepository.create(countryData);
        await countryRepository.save(country);
        console.log(`Country ${countryData.country_name} created successfully`);
      }
    }
  }
}
