import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // Enable CORS for frontend communication
    app.enableCors();

    const port = configService.get<number>('PORT') || 3003;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
}
bootstrap();
