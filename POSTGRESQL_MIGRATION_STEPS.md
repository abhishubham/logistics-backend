# PostgreSQL Migration Steps

## 🚀 Quick Migration Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start PostgreSQL with Docker
```bash
docker-compose up -d postgres
```

### 3. Wait for PostgreSQL to be ready
```bash
# Check if PostgreSQL is ready
docker-compose logs postgres
```

### 4. Run Migrations
```bash
npm run migration:run
```

### 5. Seed the Database
```bash
npm run seed:run
```

**Note**: The seed command now includes:
- Countries (10 major countries)
- Cities (11 major cities)
- Carriers (5 airlines + 5 shipping companies)
- Commodities (10 different commodity types)
- Users (4 test users with different roles)

### 6. Start the Application
```bash
npm run start:dev
```

## 🔧 Manual Setup (if not using Docker)

### 1. Install PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql`
- **Ubuntu**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database and User
```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE logistic_db;

-- Create user
CREATE USER logistic_user WITH PASSWORD 'postgres';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE logistic_db TO logistic_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO logistic_user;
```

### 3. Enable UUID Extension
```sql
-- Connect to your database
\c logistic_db

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## 🐛 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure PostgreSQL is running
   - Check if port 5432 is available
   - Verify credentials in `.env`

2. **UUID Extension Error**
   - Make sure `uuid-ossp` extension is enabled
   - Run: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

3. **Migration Fails**
   - Check PostgreSQL logs: `docker-compose logs postgres`
   - Ensure database exists and user has permissions
   - Try dropping and recreating the database

4. **Enum Type Errors**
   - The migration creates enum types automatically
   - If you get enum errors, check the migration file

### Reset Database (if needed)
```bash
# Stop containers
docker-compose down

# Remove volumes (WARNING: This deletes all data)
docker volume rm logistic-backend_postgres_data

# Start fresh
docker-compose up -d postgres
```

## ✅ Verification

After migration, verify:
- [ ] Application starts without errors
- [ ] Database connection works
- [ ] All tables are created
- [ ] Seed data is loaded
- [ ] API endpoints work

## 📊 Database Schema

The migration creates these tables:
- `users` - User management
- `countries` - Country master data
- `cities` - City master data
- `carriers` - Carrier information
- `commodities` - Commodity types
- `parties` - Business parties
- `ports_airports` - Ports and airports

All tables include proper indexes, foreign keys, and constraints for PostgreSQL.
