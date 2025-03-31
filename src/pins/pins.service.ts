import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pin } from './pin.entity';

@Injectable()
export class PinsService {
    constructor(
        @InjectRepository(Pin)
        private pinRepository: Repository<Pin>,
    ) {}

    async createPin(title: string, imageUrl: string, userId: number) {
        const pin = this.pinRepository.create({ title, imageUrl, user: { id: userId } });
        return await this.pinRepository.save(pin);
    }

    async getPins() {
        return await this.pinRepository.find({ relations: ['user'] });
    }

    async getPinById(id: number) {
        return await this.pinRepository.findOne({ where: { id } });
    }

    async findByUser(userId: number) {
        return this.pinRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
}
