"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./types");
/**
 * Services
 */
const CacheService_1 = __importDefault(require("./service/CacheService"));
const RedisService_1 = __importDefault(require("./service/RedisService"));
const OmdbService_1 = __importDefault(require("./service/OmdbService"));
const FormatterService_1 = __importDefault(require("./service/FormatterService"));
const MoviesResolver_1 = __importDefault(require("./resolvers/MoviesResolver"));
const rm = __importStar(require("typed-rest-client/RestClient"));
const container = new inversify_1.Container();
container.bind(types_1.TYPES.ResolverInterface).to(MoviesResolver_1.default).inSingletonScope();
container.bind(types_1.TYPES.CacheServiceInterface).to(CacheService_1.default).inSingletonScope();
container.bind(types_1.TYPES.FormatterInterface).to(FormatterService_1.default).inSingletonScope();
container.bind(types_1.TYPES.RedisServiceInterface).toDynamicValue((context) => {
    return new RedisService_1.default(process.env.REDIS_HOST, parseInt(process.env.REDIS_PORT));
}).inSingletonScope();
container.bind(types_1.TYPES.RestClient).toDynamicValue((context) => {
    return new rm.RestClient(process.env.OMDB_API_NAME, process.env.OMDB_API_URL);
}).inSingletonScope();
container.bind(types_1.TYPES.OmdbServiceInterface).toDynamicValue((context) => {
    return new OmdbService_1.default(container.get(types_1.TYPES.RestClient), process.env.OMDB_API_KEY, container.get(types_1.TYPES.FormatterInterface));
}).inSingletonScope();
exports.default = container;
//# sourceMappingURL=dependencies.js.map