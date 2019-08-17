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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const rm = __importStar(require("typed-rest-client/RestClient"));
const inversify_1 = require("inversify");
const apollo_server_1 = require("apollo-server");
const types_1 = require("../types");
require("reflect-metadata");
let OmdbService = class OmdbService {
    /**
     *
     * @param client rm.RestClient
     * @param apikey String
     * @param formatter FormatterInterface
     */
    constructor(client, apikey, formatter) {
        //private readonly types: Array<string> = ['movie','episode', 'series']
        this.types = ['movie', 'episode', 'series'];
        this.client = client;
        this.apikey = apikey;
        this.formatter = formatter;
    }
    /**
     *
     * @param s
     * @param type
     * @param page
     */
    search(s, type, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = this.buildQuery(s, type, page);
            let response = yield this.client.get(queryString);
            //Error handler
            //@TODO handle errors
            return this.formatter.format(response, page);
        });
    }
    /**
     *
     * @param s
     * @param type
     * @param page
     */
    buildQuery(s, type, page) {
        //Please fixme!
        let querystring = '/?apikey=' + this.apikey + '&s=' + s;
        if (type) {
            if (!this.types.includes(type)) {
                throw new apollo_server_1.ApolloError("The type value should by in the following list :[movie,episode, series]");
            }
            querystring += '&type=' + type;
        }
        if (page) {
            querystring += '&page=' + page;
        }
        return querystring;
    }
};
OmdbService = __decorate([
    inversify_1.injectable(),
    __param(2, inversify_1.inject(types_1.TYPES.FormatterInterface)),
    __metadata("design:paramtypes", [rm.RestClient, String, Object])
], OmdbService);
exports.default = OmdbService;
//# sourceMappingURL=OmdbService.js.map