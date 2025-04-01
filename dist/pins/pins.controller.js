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
exports.PinsController = void 0;
const common_1 = require("@nestjs/common");
const pins_service_1 = require("./pins.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PinsController = class PinsController {
    constructor(pinsService) {
        this.pinsService = pinsService;
    }
    createPin(req, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.createPin(body.title, body.description, body.imageUrl, req.user.userId);
        });
    }
    getAllPins() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.getPins();
        });
    }
    getPinById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.getPinById(id);
        });
    }
    getPinsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.findByUser(userId);
        });
    }
    updatePin(req, id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.updatePin(id, updateData, req.user.userId);
        });
    }
    deletePin(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pinsService.deletePin(id, req.user.userId);
        });
    }
};
exports.PinsController = PinsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "createPin", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "getAllPins", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "getPinById", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "getPinsByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "updatePin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PinsController.prototype, "deletePin", null);
exports.PinsController = PinsController = __decorate([
    (0, common_1.Controller)('pins'),
    __metadata("design:paramtypes", [pins_service_1.PinsService])
], PinsController);
