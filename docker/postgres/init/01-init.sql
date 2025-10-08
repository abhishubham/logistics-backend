-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create database if it doesn't exist (PostgreSQL doesn't have IF NOT EXISTS for databases)
-- This will be handled by the POSTGRES_DB environment variable

-- Create user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'logistic_user') THEN
        CREATE USER logistic_user WITH PASSWORD 'logistic_password';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE logistic_db TO logistic_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO logistic_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO logistic_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO logistic_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO logistic_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO logistic_user;
