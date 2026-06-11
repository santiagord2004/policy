"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./shared/filters/global-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Insurance API - Reto Integrador')
        .setDescription('API REST de gestión de pólizas y cotizaciones de seguros utilizando Arquitectura Hexagonal y Patrones de Diseño.')
        .setVersion('1.0')
        .addTag('Customers', 'Gestión de datos de clientes')
        .addTag('Policies', 'Gestión de cotizaciones, tarifas, emisiones y máquina de estados')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const kafkaBootstrap = process.env.KAFKA_BOOTSTRAP_SERVERS;
    if (kafkaBootstrap) {
        app.connectMicroservice({
            transport: microservices_1.Transport.KAFKA,
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
//# sourceMappingURL=main.js.map