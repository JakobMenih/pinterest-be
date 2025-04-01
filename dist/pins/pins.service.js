"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pin_entity_1 = require("./pin.entity");
let PinsService = class PinsService {
    constructor(pinRepository) {
        this.pinRepository = pinRepository;
    }
    createPin(title, description, imageUrl, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = this.pinRepository.create({ title, description, imageUrl, user: { id: userId } });
            return yield this.pinRepository.save(pin);
        });
    }
    getPins() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pinRepository.find({ relations: ['user'] });
        });
    }
    getPinById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = yield this.pinRepository.findOne({ where: { id }, relations: ['user'] });
            if (!pin) {
                throw new common_1.NotFoundException('Pin not found');
            }
            return pin;
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pinRepository.find({
                where: { user: { id: userId } },
                relations: ['user'],
            });
        });
    }
    updatePin(id, updateData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = yield this.getPinById(id);
            if (pin.user.id !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to update this pin');
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
            return yield this.pinRepository.save(pin);
        });
    }
    deletePin(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pin = yield this.getPinById(id);
            if (pin.user.id !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to delete this pin');
            }
            yield this.pinRepository.delete(id);
            return { message: 'Pin deleted successfully' };
        });
    }
};
exports.PinsService = PinsService;
exports.PinsService = PinsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pin_entity_1.Pin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PinsService);
