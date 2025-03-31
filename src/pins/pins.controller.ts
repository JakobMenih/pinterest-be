import { Controller, Post, Get, Body, UseGuards, Request, Param, ParseIntPipe } from '@nestjs/common';
import { PinsService } from './pins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pins')
export class PinsController {
    constructor(private pinsService: PinsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPin(@Request() req : any, @Body() body: { title: string; imageUrl: string }) {
        return this.pinsService.createPin(body.title, body.imageUrl, req.user.userId);
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
}
