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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const platform_express_1 = require("@nestjs/platform-express");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async uploadFiles(files, question) {
        if (!files || files.length === 0 || !question) {
            return { error: 'Files or question not provided' };
        }
        return await this.appService.process_docs(files, question);
    }
    async convertToBinary(prompt) {
        if (!prompt) {
            return { error: 'Prompt not provided' };
        }
        return await this.appService.convert_to_binary(prompt);
    }
    async countVowels(prompt) {
        if (!prompt) {
            return { error: 'Prompt not provided' };
        }
        return await this.appService.count_vowels(prompt);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 5, { dest: './uploads/' })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('question')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Post)('/convertToBinary'),
    __param(0, (0, common_1.Body)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "convertToBinary", null);
__decorate([
    (0, common_1.Post)('/countVowels'),
    __param(0, (0, common_1.Body)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "countVowels", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map