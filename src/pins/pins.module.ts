import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinsService } from './pins.service';
import { PinsController } from './pins.controller';
import { Pin } from './pin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Pin])],
    providers: [PinsService],
    controllers: [PinsController],
    exports: [PinsService],
})
export class PinsModule {}
