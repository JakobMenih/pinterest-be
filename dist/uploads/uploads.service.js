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
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const upload_entity_1 = require("./upload.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let UploadsService = class UploadsService {
    constructor(uploadsRepo, usersRepository) {
        this.uploadsRepo = uploadsRepo;
        this.usersRepository = usersRepository;
        this.storageConfig = {
            storage: (0, multer_1.diskStorage)({
                destination: './uploads', // Ensure the uploads folder exists
                filename: (req, file, callback) => {
                    if (!file.originalname) {
                        return callback(new Error('File must have an original name'), '');
                    }
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const filename = uniqueSuffix + (0, path_1.extname)(file.originalname);
                    console.log('Generated filename:', filename);
                    callback(null, filename);
                },
            }),
        };
    }
    create(uploadData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findOne({ where: { id: uploadData.userId } });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${uploadData.userId} not found`);
            }
            const upload = this.uploadsRepo.create({
                title: uploadData.title,
                filename: uploadData.filename,
                mimetype: uploadData.mimetype,
                size: uploadData.size,
                user,
            });
            return yield this.uploadsRepo.save(upload);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploadsRepo.find({ relations: ['user'] });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = yield this.uploadsRepo.findOne({ where: { id }, relations: ['user'] });
            if (!upload) {
                throw new common_1.NotFoundException('Upload not found');
            }
            return upload;
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploadsRepo.find({ where: { user: { id: userId } }, relations: ['user'] });
        });
    }
    updateUpload(id, updateData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = yield this.findById(id);
            if (upload.user.id !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to update this upload');
            }
            if (updateData.title !== undefined) {
                upload.title = updateData.title;
            }
            if (updateData.filename !== undefined) {
                upload.filename = updateData.filename;
            }
            if (updateData.mimetype !== undefined) {
                upload.mimetype = updateData.mimetype;
            }
            if (updateData.size !== undefined) {
                upload.size = updateData.size;
            }
            return yield this.uploadsRepo.save(upload);
        });
    }
    deleteUpload(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const upload = yield this.findById(id);
            if (upload.user.id !== userId) {
                throw new common_1.UnauthorizedException('You are not allowed to delete this upload');
            }
            yield this.uploadsRepo.delete(id);
            return { message: 'Upload deleted successfully' };
        });
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(upload_entity_1.Upload)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UploadsService);
