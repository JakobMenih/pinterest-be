// uploads.controller.ts
import {
    Controller,
    Post,
    Put,
    Delete,
    Get,
    Body,
    Req,
    UseGuards,
    UploadedFile,
    UseInterceptors,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface AuthRequest extends Request {
    user: { userId: number; email: string };
}

@Controller('uploads')
export class UploadsController {
    constructor(private uploadsService: UploadsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthRequest,
    ) {
        const userId = req.user?.userId;
        const title = req.body.title;
        if (!userId) {
            throw new Error('User ID not found in token');
        }
        if (!title) {
            throw new Error('Title is required for upload');
        }
        console.log('File uploaded:', file);
        console.log('User ID:', userId);
        await this.uploadsService.create({
            title,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            userId,
        });
        return {
            message: 'File uploaded successfully!',
            title,
            filename: file.filename,
            mimetype: file.mimetype,
            size: file.size,
            userId,
        };
    }

    // Public endpoint: GET uploads even for logged-out users
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

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
    async updateUpload(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: { title?: string; filename?: string; mimetype?: string; size?: number },
    ) {
        if (file) {
            updateData.filename = file.filename;
            updateData.mimetype = file.mimetype;
            updateData.size = file.size;
        }
        return this.uploadsService.updateUpload(id, updateData, req.user.userId);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteUpload(
        @Req() req: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.uploadsService.deleteUpload(id, req.user.userId);
    }
}
