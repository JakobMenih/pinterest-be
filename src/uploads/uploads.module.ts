import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import { User } from '../users/user.entity';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Upload, User]),
        UsersModule,
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
    ],
    providers: [UploadsService],
    controllers: [UploadsController],
    exports: [UploadsService],
})
export class UploadsModule {}
