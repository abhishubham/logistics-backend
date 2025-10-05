-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS logistic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE logistic_db;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'logistic_user'@'%' IDENTIFIED BY 'logistic_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON logistic_db.* TO 'logistic_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;
