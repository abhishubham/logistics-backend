import { AppDataSource } from './data-source';
import { UserSeed } from './seeds/user.seed';
import { CountrySeed } from './seeds/country.seed';
import { CitySeed } from './seeds/city.seed';
import { CarrierSeed } from './seeds/carrier.seed';
import { CommoditySeed } from './seeds/commodity.seed';

async function runSeeds() {
  try {
    console.log('🌱 Starting database seeding...');

    // Initialize the data source
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database connection established');
    }

    // Run seeds in order (countries first, then cities, then others)
    console.log('🌍 Seeding countries...');
    const countrySeed = new CountrySeed();
    await countrySeed.run(AppDataSource);

    console.log('🏙️ Seeding cities...');
    const citySeed = new CitySeed();
    await citySeed.run(AppDataSource);

    console.log('✈️ Seeding carriers...');
    const carrierSeed = new CarrierSeed();
    await carrierSeed.run(AppDataSource);

    console.log('📦 Seeding commodities...');
    const commoditySeed = new CommoditySeed();
    await commoditySeed.run(AppDataSource);

    console.log('👥 Seeding users...');
    const userSeed = new UserSeed();
    await userSeed.run(AppDataSource);

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    // Close the connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the seeds
runSeeds();
