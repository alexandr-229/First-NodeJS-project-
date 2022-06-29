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
exports.UserCotroller = void 0;
const inversify_1 = require("inversify");
const base_controller_1 = require("../common/base.controller");
const http_error_1 = require("../errors/http-error");
const logger_service_1 = require("../logger/logger.service");
const types_1 = require("../types");
require("reflect-metadata");
let UserCotroller = class UserCotroller extends base_controller_1.BaseController {
    constructor(loggerService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register }
        ]);
    }
    login(req, res, next) {
        next(new http_error_1.HTTPError(401, 'error', '/login'));
    }
    register(req, res, next) {
        this.ok(res, 'register');
    }
};
UserCotroller = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], UserCotroller);
exports.UserCotroller = UserCotroller;
