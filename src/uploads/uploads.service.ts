import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from './upload.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class UploadsService {
    constructor(
        @InjectRepository(Upload) private uploadsRepo: Repository<Upload>,
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    storageConfig = {
        storage: diskStorage({
            destination: './uploads', // Ensure the uploads folder exists
            filename: (req, file, callback) => {
                if (!file.originalname) {
                    return callback(new Error('File must have an original name'), '');
                }
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const filename = uniqueSuffix + extname(file.originalname);
                console.log('Generated filename:', filename);
                callback(null, filename);
            },
        }),
    };

    async create(uploadData: { title: string; filename: string; mimetype: string; size: number; userId: number }) {
        const user = await this.usersRepository.findOne({ where: { id: uploadData.userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${uploadData.userId} not found`);
        }
        const upload = this.uploadsRepo.create({
            title: uploadData.title,
            filename: uploadData.filename,
            mimetype: uploadData.mimetype,
            size: uploadData.size,
            user,
        });
        return await this.uploadsRepo.save(upload);
    }

    async findAll() {
        return await this.uploadsRepo.find({ relations: ['user'] });
    }

    async findById(id: number) {
        const upload = await this.uploadsRepo.findOne({ where: { id }, relations: ['user'] });
        if (!upload) {
            throw new NotFoundException('Upload not found');
        }
        return upload;
    }

    async findByUser(userId: number) {
        return await this.uploadsRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
    }

    async updateUpload(
        id: number,
        updateData: { title?: string; filename?: string; mimetype?: string; size?: number },
        userId: number,
    ) {
        const upload = await this.findById(id);
        if (upload.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to update this upload');
        }
        if (updateData.title !== undefined) {
            upload.title = updateData.title;
        }
        if (updateData.filename !== undefined) {
            upload.filename = updateData.filename;
        }
        if (updateData.mimetype !== undefined) {
            upload.mimetype = updateData.mimetype;
        }
        if (updateData.size !== undefined) {
            upload.size = updateData.size;
        }
        return await this.uploadsRepo.save(upload);
    }

    async deleteUpload(id: number, userId: number) {
        const upload = await this.findById(id);
        if (upload.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to delete this upload');
        }
        await this.uploadsRepo.delete(id);
        return { message: 'Upload deleted successfully' };
    }
}
