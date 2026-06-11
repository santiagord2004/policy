import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter for mapping domain exceptions
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Insurance API - Reto Integrador')
    .setDescription('API REST de gestión de pólizas y cotizaciones de seguros utilizando Arquitectura Hexagonal y Patrones de Diseño.')
    .setVersion('1.0')
    .addTag('Customers', 'Gestión de datos de clientes')
    .addTag('Policies', 'Gestión de cotizaciones, tarifas, emisiones y máquina de estados')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Kafka Microservice Hybrid connection if enabled
  const kafkaBootstrap = process.env.KAFKA_BOOTSTRAP_SERVERS;
  if (kafkaBootstrap) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [kafkaBootstrap],
        },
        consumer: {
          groupId: 'insurance-consumers',
        },
      },
    });
    
    await app.startAllMicroservices();
    console.log(`Kafka microservice listeners started. Connecting to brokers: ${kafkaBootstrap}`);
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/api/docs`);
}

bootstrap();
