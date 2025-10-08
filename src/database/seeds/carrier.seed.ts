import { DataSource } from 'typeorm';
import { Carrier } from '../entities/carrier.entity';
import { CarrierType } from '../entities/enums';

export class CarrierSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const carrierRepository = dataSource.getRepository(Carrier);

    const carriers = [
      {
        carrier_name: 'American Airlines',
        carrier_code: 'AA',
        type: CarrierType.AIRLINE,
      },
      {
        carrier_name: 'Delta Air Lines',
        carrier_code: 'DL',
        type: CarrierType.AIRLINE,
      },
      {
        carrier_name: 'United Airlines',
        carrier_code: 'UA',
        type: CarrierType.AIRLINE,
      },
      {
        carrier_name: 'Lufthansa',
        carrier_code: 'LH',
        type: CarrierType.AIRLINE,
      },
      {
        carrier_name: 'British Airways',
        carrier_code: 'BA',
        type: CarrierType.AIRLINE,
      },
      {
        carrier_name: 'Maersk Line',
        carrier_code: 'MAEU',
        type: CarrierType.SHIPPING,
      },
      {
        carrier_name: 'MSC Mediterranean Shipping',
        carrier_code: 'MSC',
        type: CarrierType.SHIPPING,
      },
      {
        carrier_name: 'CMA CGM',
        carrier_code: 'CMACGM',
        type: CarrierType.SHIPPING,
      },
      {
        carrier_name: 'Hapag-Lloyd',
        carrier_code: 'HAPAG',
        type: CarrierType.SHIPPING,
      },
      {
        carrier_name: 'COSCO Shipping',
        carrier_code: 'COSCO',
        type: CarrierType.SHIPPING,
      },
    ];

    for (const carrierData of carriers) {
      const existingCarrier = await carrierRepository.findOne({
        where: { carrier_code: carrierData.carrier_code },
      });

      if (!existingCarrier) {
        const carrier = carrierRepository.create(carrierData);
        await carrierRepository.save(carrier);
        console.log(`Carrier ${carrierData.carrier_name} created successfully`);
      }
    }
  }
}
