"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const upload_entity_1 = require("./upload.entity");
const uploads_service_1 = require("./uploads.service");
const uploads_controller_1 = require("./uploads.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const user_entity_1 = require("../users/user.entity");
const users_module_1 = require("../users/users.module");
let UploadsModule = class UploadsModule {
};
exports.UploadsModule = UploadsModule;
exports.UploadsModule = UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([upload_entity_1.Upload, user_entity_1.User]),
            users_module_1.UsersModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        callback(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
                    },
                }),
            }),
        ],
        providers: [uploads_service_1.UploadsService],
        controllers: [uploads_controller_1.UploadsController],
        exports: [uploads_service_1.UploadsService],
    })
], UploadsModule);
