import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const SWAGGER_TITLE = 'Portfolio News API';
  const SWAGGER_DESCRIPTION = 'Portfolio News API Swagger';
  const SWAGGER_VERSION = '1.0';
  const SWAGGER_JSON_PATH = '/swagger-json';
  const SWAGGER_API_PATH = 'api';
  const ACCESS_TOKEN = 'accessToken';

  // Configure Swagger options
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addCookieAuth(ACCESS_TOKEN, { type: 'apiKey', in: 'cookie' })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: SWAGGER_TITLE,
        description: 'Enter JWT Token (accessToken)',
      },
      ACCESS_TOKEN,
    )
    .setExternalDoc(
      'swagger-json(" now use in postman to import json")',
      SWAGGER_JSON_PATH,
    )
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module
  SwaggerModule.setup(SWAGGER_API_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Expose Swagger JSON document at /swagger-json
  app.use(SWAGGER_JSON_PATH, (_, res) => {
    res.type('application/json').send(document);
  });
}
