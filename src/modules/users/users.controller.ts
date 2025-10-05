import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, ChangePasswordDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, UserRole } from '@/database/entities/user.entity';
import { ApiResponseDto } from '../../common/dto/api-response.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new user', description: 'Create a new user account (Admin only)' })
  @ApiBody({ type: CreateUserDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User created successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'User created successfully',
  //       data: {
  //         id: 'uuid',
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         role: 'user',
  //         status: 'active',
  //         createdAt: '2023-01-01T00:00:00.000Z',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Validation error or user already exists',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin role required',
  // })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get all users', description: 'Retrieve a paginated list of all users (Admin/Manager only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Users retrieved successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Users retrieved successfully',
  //       data: [
  //         {
  //           id: 'uuid',
  //           email: 'user@example.com',
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           role: 'user',
  //           status: 'active',
  //         },
  //       ],
  //       meta: {
  //         page: 1,
  //         limit: 10,
  //         total: 1,
  //         totalPages: 1,
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin or Manager role required',
  // })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get user by ID', description: 'Retrieve a specific user by their ID (Admin/Manager only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User retrieved successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'User retrieved successfully',
  //       data: {
  //         id: 'uuid',
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         role: 'user',
  //         status: 'active',
  //         phone: '+1234567890',
  //         createdAt: '2023-01-01T00:00:00.000Z',
  //         updatedAt: '2023-01-01T00:00:00.000Z',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin or Manager role required',
  // })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update user', description: 'Update user information (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User updated successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'User updated successfully',
  //       data: {
  //         id: 'uuid',
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         role: 'user',
  //         status: 'active',
  //         updatedAt: '2023-01-01T00:00:00.000Z',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin role required',
  // })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete user', description: 'Delete a user account (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User deleted successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'User deleted successfully',
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin role required',
  // })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/change-password')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Change user password', description: 'Change password for a specific user (Admin only)' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiBody({ type: ChangePasswordDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Password changed successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Password changed successfully',
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Invalid current password',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden - Admin role required',
  // })
  changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, changePasswordDto);
  }

  @Get('profile/me')
  @ApiOperation({ summary: 'Get my profile', description: 'Get current authenticated user profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Profile retrieved successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Profile retrieved successfully',
  //       data: {
  //         id: 'uuid',
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         role: 'user',
  //         status: 'active',
  //         phone: '+1234567890',
  //         createdAt: '2023-01-01T00:00:00.000Z',
  //         updatedAt: '2023-01-01T00:00:00.000Z',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized - Invalid or missing token',
  // })
  getMyProfile(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Patch('profile/me')
  @ApiOperation({ summary: 'Update my profile', description: 'Update current authenticated user profile (role and status cannot be changed)' })
  @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Profile updated successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Profile updated successfully',
  //       data: {
  //         id: 'uuid',
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Doe',
  //         role: 'user',
  //         status: 'active',
  //         updatedAt: '2023-01-01T00:00:00.000Z',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Validation error',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized - Invalid or missing token',
  // })
  updateMyProfile(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Remove role and status from update for self-update
    const { role, status, ...allowedUpdates } = updateUserDto;
    return this.usersService.update(user.id, allowedUpdates);
  }

  @Patch('profile/change-password')
  @ApiOperation({ summary: 'Change my password', description: 'Change password for current authenticated user' })
  @ApiBody({ type: ChangePasswordDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Password changed successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Password changed successfully',
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Invalid current password',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized - Invalid or missing token',
  // })
  changeMyPassword(
    @CurrentUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.id, changePasswordDto);
  }
}