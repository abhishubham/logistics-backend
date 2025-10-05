import { DataSource } from 'typeorm';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

export class UserSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // Check if admin user already exists
    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@logistic.com' },
    });

    if (!existingAdmin) {
      const adminUser = userRepository.create({
        email: 'admin@logistic.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        address: '123 Admin Street',
        city: 'Admin City',
        country: 'Admin Country',
        postalCode: '12345',
      });

      await userRepository.save(adminUser);
      console.log('Admin user created successfully');
    }

    // Check if manager user already exists
    const existingManager = await userRepository.findOne({
      where: { email: 'manager@logistic.com' },
    });

    if (!existingManager) {
      const managerUser = userRepository.create({
        email: 'manager@logistic.com',
        password: 'manager123',
        firstName: 'Manager',
        lastName: 'User',
        phone: '+1234567891',
        role: UserRole.MANAGER,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        address: '456 Manager Avenue',
        city: 'Manager City',
        country: 'Manager Country',
        postalCode: '54321',
      });

      await userRepository.save(managerUser);
      console.log('Manager user created successfully');
    }

    // Check if driver user already exists
    const existingDriver = await userRepository.findOne({
      where: { email: 'driver@logistic.com' },
    });

    if (!existingDriver) {
      const driverUser = userRepository.create({
        email: 'driver@logistic.com',
        password: 'driver123',
        firstName: 'Driver',
        lastName: 'User',
        phone: '+1234567892',
        role: UserRole.DRIVER,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        address: '789 Driver Road',
        city: 'Driver City',
        country: 'Driver Country',
        postalCode: '67890',
      });

      await userRepository.save(driverUser);
      console.log('Driver user created successfully');
    }

    // Check if regular user already exists
    const existingUser = await userRepository.findOne({
      where: { email: 'user@logistic.com' },
    });

    if (!existingUser) {
      const regularUser = userRepository.create({
        email: 'user@logistic.com',
        password: 'user123',
        firstName: 'Regular',
        lastName: 'User',
        phone: '+1234567893',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        address: '321 User Lane',
        city: 'User City',
        country: 'User Country',
        postalCode: '09876',
      });

      await userRepository.save(regularUser);
      console.log('Regular user created successfully');
    }
  }
}
