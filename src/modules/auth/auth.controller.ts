import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@/database/entities/user.entity';
import { ApiResponseDto } from '../../common/dto/api-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login', description: 'Authenticate user with email and password' })
  @ApiBody({ type: LoginDto })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Login successful',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Login successful',
  //       data: {
  //         user: {
  //           id: 'uuid',
  //           email: 'user@example.com',
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           role: 'user',
  //           status: 'active',
  //         },
  //         accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Invalid credentials',
  //   schema: {
  //     example: {
  //       success: false,
  //       message: 'Invalid credentials',
  //       errors: ['Invalid email or password'],
  //     },
  //   },
  // })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User registration', description: 'Register a new user account' })
  @ApiBody({ type: RegisterDto })
  // @ApiResponse({
  //   status: 201,
  //   description: 'User registered successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'User registered successfully',
  //       data: {
  //         user: {
  //           id: 'uuid',
  //           email: 'user@example.com',
  //           firstName: 'John',
  //           lastName: 'Doe',
  //           role: 'user',
  //           status: 'active',
  //         },
  //         accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Validation error or user already exists',
  //   schema: {
  //     example: {
  //       success: false,
  //       message: 'Validation failed',
  //       errors: ['Email already exists'],
  //     },
  //   },
  // })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile', description: 'Get current authenticated user profile' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User profile retrieved successfully',
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
  async getProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Refresh access token', description: 'Generate a new access token using the current valid token' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Token refreshed successfully',
  //   type: ApiResponseDto,
  //   schema: {
  //     example: {
  //       success: true,
  //       message: 'Token refreshed successfully',
  //       data: {
  //         accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 401,
  //   description: 'Unauthorized - Invalid or expired token',
  // })
  async refreshToken(@CurrentUser() user: User) {
    return this.authService.refreshToken(user.id);
  }
}
