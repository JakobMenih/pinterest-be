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
exports.UploadsController = void 0;
// uploads.controller.ts
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const uploads_service_1 = require("./uploads.service");
const passport_1 = require("@nestjs/passport");
let UploadsController = class UploadsController {
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    uploadFile(file, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const title = req.body.title;
            if (!userId) {
                throw new Error('User ID not found in token');
            }
            if (!title) {
                throw new Error('Title is required for upload');
            }
            console.log('File uploaded:', file);
            console.log('User ID:', userId);
            yield this.uploadsService.create({
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
        });
    }
    // Public endpoint: GET uploads even for logged-out users
    getAllUploads() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadsService.findAll();
        });
    }
    getUploadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadsService.findById(id);
        });
    }
    getUploadsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadsService.findByUser(userId);
        });
    }
    updateUpload(file, req, id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file) {
                updateData.filename = file.filename;
                updateData.mimetype = file.mimetype;
                updateData.size = file.size;
            }
            return this.uploadsService.updateUpload(id, updateData, req.user.userId);
        });
    }
    deleteUpload(req, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadsService.deleteUpload(id, req.user.userId);
        });
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { dest: './uploads' })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "getAllUploads", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "getUploadById", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "getUploadsByUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { dest: './uploads' })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "updateUpload", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "deleteUpload", null);
exports.UploadsController = UploadsController = __decorate([
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], UploadsController);
