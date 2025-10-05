import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global exception filters
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  // CORS configuration
  app.enableCors({
    origin: configService.get<string>('app.corsOrigin'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Security headers
  app.use(helmet());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Logistic Backend API')
    .setDescription('A comprehensive logistic management system API built with NestJS')
    .setVersion('1.0.0')
    .setContact(
      'Logistic Team',
      'https://logistic-backend.com',
      'support@logistic-backend.com'
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Authentication', 'User authentication and authorization endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Health', 'Health check endpoints')
    .addTag('Master Data', 'Master data endpoints (countries, cities, ports/airports, carriers, commodities, parties)')
    .addTag('Countries')
    .addTag('Cities')
    .addTag('Ports/Airports')
    .addTag('Carriers')
    .addTag('Commodities')
    .addTag('Parties')
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.logistic-backend.com', 'Production server')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Expose JSON for frontend generators
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/api/docs-json', (req, res) => {
    res.json(document);
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      showRequestHeaders: true,
      tryItOutEnabled: true,
    },
    customSiteTitle: 'Logistic Backend API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #1f2937; }
    `,
  });

  const port = configService.get<number>('app.port');
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`🧩 Swagger JSON: http://localhost:${port}/api/docs-json`);
  console.log(`🌍 Environment: ${configService.get<string>('app.nodeEnv')}`);
}

bootstrap();