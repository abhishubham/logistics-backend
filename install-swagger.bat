@echo off
echo Installing Swagger dependencies...
npm install @nestjs/swagger@7.0.0 swagger-ui-express@5.0.0 --save
echo.
echo Dependencies installed successfully!
echo.
echo Now you can uncomment the Swagger imports in:
echo - src/main.ts
echo - src/modules/auth/auth.controller.ts
echo - src/modules/users/users.controller.ts
echo - src/modules/common/health.controller.ts
echo - All DTO files
echo.
echo Then run: npm run start:dev
pause

