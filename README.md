# Logistic Backend API

A robust, production-ready NestJS backend application for logistic management with JWT authentication, MySQL database, and comprehensive user management.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete CRUD operations for users with different roles (Admin, Manager, Driver, User)
- **Database**: MySQL with TypeORM for robust data management
- **Validation**: Comprehensive input validation using class-validator
- **Error Handling**: Global exception filters with standardized error responses
- **Security**: Password hashing, CORS configuration, rate limiting
- **Docker**: Complete Docker setup with MySQL, Redis, and Nginx
- **Code Quality**: ESLint, Prettier, and TypeScript configuration

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator & class-transformer
- **Containerization**: Docker & Docker Compose
- **Reverse Proxy**: Nginx
- **Cache**: Redis

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker & Docker Compose (for containerized setup)
- MySQL (for local development)

## 🚀 Quick Start

### Option 1: Docker Setup (Recommended)

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd logistic-backend
   ```

2. **Environment setup**:
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker**:
   ```bash
   docker-compose up -d
   ```

4. **Run migrations**:
   ```bash
   docker-compose exec app npm run migration:run
   ```

5. **Seed the database**:
   ```bash
   docker-compose exec app npm run seed:run
   ```

### Option 2: Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp env.example .env
   # Configure your database and other settings
   ```

3. **Start MySQL** (if not using Docker):
   ```bash
   # Make sure MySQL is running on port 3306
   ```

4. **Run migrations**:
   ```bash
   npm run migration:run
   ```

5. **Seed the database**:
   ```bash
   npm run seed:run
   ```

6. **Start development server**:
   ```bash
   npm run start:dev
   ```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `http://your-domain.com/api/v1`

### Authentication Endpoints

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/v1/auth/profile
Authorization: Bearer <jwt-token>
```

### User Management Endpoints

#### Get All Users (Admin/Manager only)
```http
GET /api/v1/users?page=1&limit=10&search=john
Authorization: Bearer <jwt-token>
```

#### Get User by ID
```http
GET /api/v1/users/{id}
Authorization: Bearer <jwt-token>
```

#### Update User (Admin only)
```http
PATCH /api/v1/users/{id}
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "firstName": "Updated Name",
  "role": "manager"
}
```

#### Delete User (Admin only)
```http
DELETE /api/v1/users/{id}
Authorization: Bearer <jwt-token>
```

## 👥 Default Users

The application comes with pre-seeded users for testing:

| Email | Password | Role |
|-------|----------|------|
| admin@logistic.com | admin123 | Admin |
| manager@logistic.com | manager123 | Manager |
| driver@logistic.com | driver123 | Driver |
| user@logistic.com | user123 | User |

## 🔐 User Roles

- **Admin**: Full access to all operations
- **Manager**: Can view and manage users (read-only for some operations)
- **Driver**: Limited access for driver-specific operations
- **User**: Basic user operations

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Building
npm run build              # Build the application
npm run start:prod         # Start production build

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
npm run seed:run          # Run database seeds

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:e2e          # Run end-to-end tests
npm run test:cov           # Run tests with coverage
```

### Project Structure

```
src/
├── common/                 # Shared utilities
│   ├── decorators/        # Custom decorators
│   ├── dto/              # Data transfer objects
│   ├── filters/          # Exception filters
│   ├── guards/           # Authentication guards
│   ├── interceptors/     # Request/Response interceptors
│   └── pipes/            # Validation pipes
├── config/               # Configuration files
├── database/             # Database related files
│   ├── entities/         # TypeORM entities
│   ├── migrations/       # Database migrations
│   └── seeds/           # Database seeders
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   └── users/           # User management module
├── app.module.ts         # Root module
└── main.ts              # Application entry point
```

## 🐳 Docker Configuration

The application includes a complete Docker setup:

- **MySQL**: Database server
- **Redis**: Caching and session storage
- **Nginx**: Reverse proxy with rate limiting
- **App**: NestJS application

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Access application container
docker-compose exec app sh
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `PORT` | Application port | 3000 |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | password |
| `DB_DATABASE` | Database name | logistic_db |
| `JWT_SECRET` | JWT secret key | (required) |
| `JWT_EXPIRES_IN` | JWT expiration | 24h |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 |

## 🚀 Deployment

### Production Checklist

- [ ] Update JWT secrets
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure CORS origins
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Environment Setup

1. Copy `env.example` to `.env`
2. Update all environment variables
3. Ensure database is accessible
4. Run migrations: `npm run migration:run`
5. Seed initial data: `npm run seed:run`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Happy Coding! 🚀**
