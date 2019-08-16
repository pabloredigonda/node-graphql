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
const types_1 = require("../types");
const inversify_1 = require("inversify");
require("reflect-metadata");
let CacheService = class CacheService {
    /**
     *
     * @param service RedisServiceInterface
     */
    constructor(service) {
        this.expire = 120;
        this.service = service;
    }
    /**
     *
     * @param key string
     */
    get(key) {
        return new Promise((resolve, reject) => {
            this.service.getClient().get(key, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data != null) {
                    data = JSON.parse(data);
                }
                resolve(data);
            });
        });
    }
    /**
     *
     * @param key string
     * @param data JSON
     */
    set(key, data) {
        this.service.getClient().set(key, JSON.stringify(data), 'EX', this.expire);
    }
};
CacheService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.RedisServiceInterface)),
    __metadata("design:paramtypes", [Object])
], CacheService);
exports.default = CacheService;
//# sourceMappingURL=CacheService.js.map