import {
  IsEmail,
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@/database/entities/user.entity';

export class CreateUserDto {
  // @ApiProperty({
  //   description: 'User email address',
  //   example: 'user@example.com',
  //   format: 'email',
  // })
  @IsEmail()
  email: string;

  // @ApiProperty({
  //   description: 'User password',
  //   example: 'password123',
  //   minLength: 6,
  // })
  @IsString()
  @MinLength(6)
  password: string;

  // @ApiProperty({
  //   description: 'User first name',
  //   example: 'John',
  //   maxLength: 50,
  // })
  @IsString()
  @MaxLength(50)
  firstName: string;

  // @ApiProperty({
  //   description: 'User last name',
  //   example: 'Doe',
  //   maxLength: 50,
  // })
  @IsString()
  @MaxLength(50)
  lastName: string;

  // @ApiPropertyOptional({
  //   description: 'User phone number',
  //   example: '+1234567890',
  // })
  @IsOptional()
  @IsString()
  phone?: string;

  // @ApiPropertyOptional({
  //   description: 'User role',
  //   enum: UserRole,
  //   example: UserRole.USER,
  // })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  // @ApiPropertyOptional({
  //   description: 'User address',
  //   example: '123 Main St',
  // })
  @IsOptional()
  @IsString()
  address?: string;

  // @ApiPropertyOptional({
  //   description: 'User city',
  //   example: 'New York',
  // })
  @IsOptional()
  @IsString()
  city?: string;

  // @ApiPropertyOptional({
  //   description: 'User country',
  //   example: 'United States',
  // })
  @IsOptional()
  @IsString()
  country?: string;

  // @ApiPropertyOptional({
  //   description: 'User postal code',
  //   example: '10001',
  // })
  @IsOptional()
  @IsString()
  postalCode?: string;

  // @ApiPropertyOptional({
  //   description: 'User date of birth',
  //   example: '1990-01-01',
  //   format: 'date',
  // })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

export class UpdateUserDto {
  // @ApiPropertyOptional({
  //   description: 'User email address',
  //   example: 'user@example.com',
  //   format: 'email',
  // })
  @IsOptional()
  @IsEmail()
  email?: string;

  // @ApiPropertyOptional({
  //   description: 'User first name',
  //   example: 'John',
  //   maxLength: 50,
  // })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  // @ApiPropertyOptional({
  //   description: 'User last name',
  //   example: 'Doe',
  //   maxLength: 50,
  // })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  // @ApiPropertyOptional({
  //   description: 'User phone number',
  //   example: '+1234567890',
  // })
  @IsOptional()
  @IsString()
  phone?: string;

  // @ApiPropertyOptional({
  //   description: 'User role',
  //   enum: UserRole,
  //   example: UserRole.USER,
  // })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  // @ApiPropertyOptional({
  //   description: 'User status',
  //   enum: UserStatus,
  //   example: UserStatus.ACTIVE,
  // })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  // @ApiPropertyOptional({
  //   description: 'User avatar URL',
  //   example: 'https://example.com/avatar.jpg',
  // })
  @IsOptional()
  @IsString()
  avatar?: string;

  // @ApiPropertyOptional({
  //   description: 'User address',
  //   example: '123 Main St',
  // })
  @IsOptional()
  @IsString()
  address?: string;

  // @ApiPropertyOptional({
  //   description: 'User city',
  //   example: 'New York',
  // })
  @IsOptional()
  @IsString()
  city?: string;

  // @ApiPropertyOptional({
  //   description: 'User country',
  //   example: 'United States',
  // })
  @IsOptional()
  @IsString()
  country?: string;

  // @ApiPropertyOptional({
  //   description: 'User postal code',
  //   example: '10001',
  // })
  @IsOptional()
  @IsString()
  postalCode?: string;

  // @ApiPropertyOptional({
  //   description: 'User date of birth',
  //   example: '1990-01-01',
  //   format: 'date',
  // })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

export class ChangePasswordDto {
  // @ApiProperty({
  //   description: 'Current user password',
  //   example: 'currentPassword123',
  //   minLength: 6,
  // })
  @IsString()
  @MinLength(6)
  currentPassword: string;

  // @ApiProperty({
  //   description: 'New user password',
  //   example: 'newPassword123',
  //   minLength: 6,
  // })
  @IsString()
  @MinLength(6)
  newPassword: string;
}