'use strict';
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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const types_1 = require("../types");
let MoviesResolver = class MoviesResolver {
    /**
     *
     * @param omdbService OmdbServiceInterface
     * @param cacheService CacheServiceInterface
     */
    constructor(omdbService, cacheService) {
        this.omdbService = omdbService;
        this.cacheService = cacheService;
    }
    /**
     *
     * @param args SearchParamsInterface
     */
    resolve(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = args.type !== undefined ? args.type : '';
            const page = args.page !== undefined ? parseInt(args.page) : 1;
            const key = `${args.s}-${page}-${type}`;
            let data = yield this.cacheService.get(key);
            if (!data) {
                data = yield this.omdbService.search(args.s, type, page);
                this.cacheService.set(key, data);
            }
            return data;
        });
    }
};
MoviesResolver = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.OmdbServiceInterface)),
    __param(1, inversify_1.inject(types_1.TYPES.CacheServiceInterface)),
    __metadata("design:paramtypes", [Object, Object])
], MoviesResolver);
exports.default = MoviesResolver;
//# sourceMappingURL=MoviesResolver.js.map