const { NestFactory } = require('@nestjs/core');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('../dist/app.module');
const fs = require('fs');
const yaml = require('js-yaml');

async function generateOpenAPI() {
  try {
    // Create the NestJS application
    const app = await NestFactory.create(AppModule);
    
    // Configure Swagger
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
      .addServer('http://localhost:3000', 'Development server')
      .addServer('https://api.logistic-backend.com', 'Production server')
      .build();

    // Generate the OpenAPI document
    const document = SwaggerModule.createDocument(app, config);
    
    // Convert to YAML
    const yamlString = yaml.dump(document, {
      indent: 2,
      lineWidth: 120,
      noRefs: true,
      sortKeys: false,
    });
    
    // Write to file
    fs.writeFileSync('./openapi.yaml', yamlString);
    
    console.log('✅ OpenAPI YAML generated successfully!');
    console.log('📄 File: ./openapi.yaml');
    
    // Close the application
    await app.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating OpenAPI YAML:', error);
    process.exit(1);
  }
}

generateOpenAPI();

