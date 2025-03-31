"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pins_service_1 = require("./pins.service");
const pins_controller_1 = require("./pins.controller");
const pin_entity_1 = require("./pin.entity");
let PinsModule = class PinsModule {
};
exports.PinsModule = PinsModule;
exports.PinsModule = PinsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pin_entity_1.Pin])],
        providers: [pins_service_1.PinsService],
        controllers: [pins_controller_1.PinsController],
        exports: [pins_service_1.PinsService],
    })
], PinsModule);
