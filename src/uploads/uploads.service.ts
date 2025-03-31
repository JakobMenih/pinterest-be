import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {InjectRepository} from "@nestjs/typeorm";
import {Upload} from "./upload.entity";
import {Repository} from "typeorm";
import { User } from '../users/user.entity';

@Injectable()
export class UploadsService {
    constructor(
        @InjectRepository(Upload) private uploadsRepo: Repository<Upload>,
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    storageConfig = {
        storage: diskStorage({
            destination: './uploads',  // ✅ Ensure the uploads folder exists
            filename: (req, file, callback) => {
                if (!file.originalname) {
                    return callback(new Error('File must have an original name'), '');
                }

                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const filename = uniqueSuffix + extname(file.originalname);

                console.log("Generated filename:", filename);  // ✅ Debugging

                callback(null, filename);
            },
        }),
    };
    async create(uploadData: { filename: string; mimetype: string; size: number; userId: number }) {
        const user = await this.usersRepository.findOne({ where: { id: uploadData.userId } });

        if (!user) {
            throw new Error(`User with ID ${uploadData.userId} not found`);
        }

        const upload = this.uploadsRepo.create({
            filename: uploadData.filename,
            mimetype: uploadData.mimetype,
            size: uploadData.size,
            user,
        });

        return this.uploadsRepo.save(upload);
    }

    async findAll() {
        return this.uploadsRepo.find();
    }

    async findById(id: number) {
        return this.uploadsRepo.findOne({ where: { id } });
    }

    async findByUser(userId: number) {
        return this.uploadsRepo.find({ where: { user: { id: userId } } });
    }
}
