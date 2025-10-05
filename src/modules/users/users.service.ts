import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { User } from '@/database/entities/user.entity';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiResponseDto } from '../../common/dto/api-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ApiResponseDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    const { password: _, ...result } = savedUser;

    return ApiResponseDto.success(
      { user: result },
      'User created successfully',
    );
  }

  async findAll(paginationDto: PaginationDto): Promise<ApiResponseDto> {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', sortOrder = 'DESC' } = paginationDto;
    const skip = (page - 1) * limit;

    const whereConditions: FindOptionsWhere<User> = {};
    if (search) {
      whereConditions.email = Like(`%${search}%`);
    }

    const [users, total] = await this.usersRepository.findAndCount({
      where: whereConditions,
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'phone',
        'role',
        'status',
        'avatar',
        'address',
        'city',
        'country',
        'postalCode',
        'dateOfBirth',
        'emailVerified',
        'lastLoginAt',
        'createdAt',
        'updatedAt',
      ],
      order: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return ApiResponseDto.paginated(
      users,
      {
        page,
        limit,
        total,
        totalPages,
      },
      'Users retrieved successfully',
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'phone',
        'role',
        'status',
        'avatar',
        'address',
        'city',
        'country',
        'postalCode',
        'dateOfBirth',
        'emailVerified',
        'lastLoginAt',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOne(id: string): Promise<ApiResponseDto> {
    const user = await this.findById(id);
    return ApiResponseDto.success({ user });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ApiResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.findById(id);

    return ApiResponseDto.success(
      { user: updatedUser },
      'User updated successfully',
    );
  }

  async remove(id: string): Promise<ApiResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);

    return ApiResponseDto.success(null, 'User deleted successfully');
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<ApiResponseDto> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await user.validatePassword(
      changePasswordDto.currentPassword,
    );

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 12);
    await this.usersRepository.update(id, { password: hashedNewPassword });

    return ApiResponseDto.success(null, 'Password changed successfully');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
