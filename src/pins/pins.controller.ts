import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    UseGuards,
    Request,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { PinsService } from './pins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPin(
        @Request() req: any,
        @Body() body: { title: string; description?: string; imageUrl?: string },
    ) {
        return this.pinsService.createPin(body.title, body.description, body.imageUrl, req.user.userId);
    }

    @Get()
    async getAllPins() {
        return this.pinsService.getPins();
    }

    @Get(':id')
    async getPinById(@Param('id', ParseIntPipe) id: number) {
        return this.pinsService.getPinById(id);
    }

    @Get('user/:userId')
    async getPinsByUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.pinsService.findByUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updatePin(
        @Request() req: any,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateData: { title?: string; description?: string; imageUrl?: string },
    ) {
        return this.pinsService.updatePin(id, updateData, req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePin(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
        return this.pinsService.deletePin(id, req.user.userId);
    }
}
