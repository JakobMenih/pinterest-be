import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Get,
    Req,
    UseGuards,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// ✅ Define AuthRequest to include user from JWT
interface AuthRequest extends Request {
    user: { userId: number; email: string };
}

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
    constructor(private uploadsService: UploadsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthRequest
    ) {
        const userId = req.user?.userId;

        if (!userId) {
            throw new Error('User ID not found in token');
        }

        console.log('File uploaded:', file);
        console.log('User ID:', userId);

        const upload = await this.uploadsService.create({
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            userId,
        });

        return {
            message: 'File uploaded successfully!',
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            userId,
        };
    }

    @Get()
    async getAllUploads() {
        return this.uploadsService.findAll();
    }

    @Get(':id')
    async getUploadById(@Param('id', ParseIntPipe) id: number) {
        return this.uploadsService.findById(id);
    }

    @Get('user/:userId')
    async getUploadsByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.uploadsService.findByUser(userId);
    }
}
