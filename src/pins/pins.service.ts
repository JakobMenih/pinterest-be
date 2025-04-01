import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pin } from './pin.entity';

@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(Pin)
        private pinRepository: Repository<Pin>,
    ) {}

    async createPin(
        title: string,
        description: string | undefined,
        imageUrl: string | undefined,
        userId: number,
    ) {
        const pin = this.pinRepository.create({ title, description, imageUrl, user: { id: userId } });
        return await this.pinRepository.save(pin);
    }

    async getPins() {
        return await this.pinRepository.find({ relations: ['user'] });
    }

    async getPinById(id: number) {
        const pin = await this.pinRepository.findOne({ where: { id }, relations: ['user'] });
        if (!pin) {
            throw new NotFoundException('Pin not found');
        }
        return pin;
    }

    async findByUser(userId: number) {
        return await this.pinRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }

    async updatePin(
        id: number,
        updateData: { title?: string; description?: string; imageUrl?: string },
        userId: number,
    ) {
        const pin = await this.getPinById(id);
        if (pin.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to update this pin');
        }
        if (updateData.title !== undefined) {
            pin.title = updateData.title;
        }
        if (updateData.description !== undefined) {
            pin.description = updateData.description;
        }
        if (updateData.imageUrl !== undefined) {
            pin.imageUrl = updateData.imageUrl;
        }
        return await this.pinRepository.save(pin);
    }

    async deletePin(id: number, userId: number) {
        const pin = await this.getPinById(id);
        if (pin.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to delete this pin');
        }
        await this.pinRepository.delete(id);
        return { message: 'Pin deleted successfully' };
    }
}
