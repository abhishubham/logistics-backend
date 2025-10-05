# Login API Testing Guide

## 🚀 Server Status
Your NestJS server is running with `ts-node-dev` and will automatically restart when you make changes to any file.

**Server URL:** `http://localhost:3000/api/v1`

## 🔐 Authentication Endpoints

### 1. User Registration
**Endpoint:** `POST /api/v1/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**PowerShell Test:**
```powershell
$registerBody = '{"email": "newuser@example.com", "password": "password123", "firstName": "John", "lastName": "Doe"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/register" -Method POST -ContentType "application/json" -Body $registerBody
```

### 2. User Login
**Endpoint:** `POST /api/v1/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**PowerShell Test:**
```powershell
$loginBody = '{"email": "test@example.com", "password": "test123"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method POST -ContentType "application/json" -Body $loginBody
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "status": "active"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get User Profile (Protected)
**Endpoint:** `GET /api/v1/auth/profile`

**Headers:**
```
Authorization: Bearer <access_token>
```

**PowerShell Test:**
```powershell
# First login to get token
$loginBody = '{"email": "test@example.com", "password": "test123"}'
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/login" -Method POST -ContentType "application/json" -Body $loginBody

# Extract token and test profile
$token = $response.data.accessToken
$headers = @{Authorization = "Bearer $token"}
Invoke-RestMethod -Uri "http://localhost:3000/api/v1/auth/profile" -Method GET -Headers $headers
```

### 4. Refresh Token
**Endpoint:** `POST /api/v1/auth/refresh`

**Headers:**
```
Authorization: Bearer <access_token>
```

## 🧪 Test Users

You can create test users using the registration endpoint. Here are some examples:

### Test User 1
```json
{
  "email": "admin@test.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User"
}
```

### Test User 2
```json
{
  "email": "manager@test.com",
  "password": "manager123",
  "firstName": "Manager",
  "lastName": "User"
}
```

## 🔧 Development Commands

### Start Development Server
```bash
npm run start:dev
```
This uses `ts-node-dev` for automatic restarts on file changes.

### Build Project
```bash
npm run build
```

### Run Migrations
```bash
npm run migration:run
```

## 📝 Testing with Different Tools

### Using Postman
1. Create a new request
2. Set method to POST
3. URL: `http://localhost:3000/api/v1/auth/login`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "email": "test@example.com",
  "password": "test123"
}
```

### Using curl (if available)
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'
```

## ✅ Verification Steps

1. **Register a new user** using the registration endpoint
2. **Login with the same credentials** to get an access token
3. **Use the access token** to access protected endpoints like `/auth/profile`
4. **Verify the response** contains user data and JWT token

## 🚨 Common Issues

1. **Invalid credentials**: Make sure the user exists and password is correct
2. **Unauthorized**: Check if the JWT token is valid and properly formatted
3. **Server not running**: Ensure `npm run start:dev` is running
4. **Database connection**: Check if MySQL is running and accessible

## 📊 Response Format

All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object,
  "errors": string[]
}
```

Happy testing! 🎉
