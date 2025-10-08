import { DataSource } from 'typeorm';
import { Commodity } from '../entities/commodity.entity';

export class CommoditySeed {
  public async run(dataSource: DataSource): Promise<void> {
    const commodityRepository = dataSource.getRepository(Commodity);

    const commodities = [
      {
        commodity_name: 'Electronics',
        commodity_code: 'ELEC',
        category: 'Electronics',
      },
      {
        commodity_name: 'Textiles',
        commodity_code: 'TEXT',
        category: 'Manufacturing',
      },
      {
        commodity_name: 'Automotive Parts',
        commodity_code: 'AUTO',
        category: 'Automotive',
      },
      {
        commodity_name: 'Pharmaceuticals',
        commodity_code: 'PHARM',
        category: 'Healthcare',
      },
      {
        commodity_name: 'Food Products',
        commodity_code: 'FOOD',
        category: 'Food & Beverage',
      },
      {
        commodity_name: 'Chemicals',
        commodity_code: 'CHEM',
        category: 'Chemical',
      },
      {
        commodity_name: 'Machinery',
        commodity_code: 'MACH',
        category: 'Industrial',
      },
      {
        commodity_name: 'Raw Materials',
        commodity_code: 'RAW',
        category: 'Raw Materials',
      },
      {
        commodity_name: 'Furniture',
        commodity_code: 'FURN',
        category: 'Furniture',
      },
      {
        commodity_name: 'Books & Media',
        commodity_code: 'BOOK',
        category: 'Media',
      },
    ];

    for (const commodityData of commodities) {
      const existingCommodity = await commodityRepository.findOne({
        where: { commodity_code: commodityData.commodity_code },
      });

      if (!existingCommodity) {
        const commodity = commodityRepository.create(commodityData);
        await commodityRepository.save(commodity);
        console.log(
          `Commodity ${commodityData.commodity_name} created successfully`,
        );
      }
    }
  }
}
