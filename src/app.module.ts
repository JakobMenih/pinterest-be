import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadsService } from './uploads/uploads.service';
import { UploadsController } from './uploads/uploads.controller';
import { PinsModule } from './pins/pins.module';
import { UploadsModule } from './uploads/uploads.module';
import {Upload} from "./uploads/upload.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                autoLoadEntities: true,
                entities: [Upload],
                synchronize: true,
            }),
        }),
        AuthModule,
        UsersModule,
        PinsModule,
        UploadsModule,
    ],
})
export class AppModule {}
