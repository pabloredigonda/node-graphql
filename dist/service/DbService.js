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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const inversify_1 = require("inversify");
require("reflect-metadata");
let DbService = class DbService {
    constructor(host, db, user, pass) {
        let uri;
        if (user) {
            uri = 'mongodb://' + user + ':' + pass + '@' + host + '/' + db + '?ssl=true&replicaSet=meli-mongo-shard-0&authSource=admin&retryWrites=true&w=majority';
        }
        else {
            uri = 'mongodb://' + host + '/' + db;
        }
        //console.log("uri: " + uri)
        mongoose_1.default.connect(uri, {
            useMongoClient: true
        });
        this.db = mongoose_1.default.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
    }
    getDb() {
        return this.db;
    }
};
DbService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, String, String, String])
], DbService);
exports.default = DbService;
//# sourceMappingURL=DbService.js.map