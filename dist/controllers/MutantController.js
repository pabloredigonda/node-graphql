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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const rsmq_1 = __importDefault(require("rsmq"));
let MutantController = class MutantController {
    constructor(service, rsmq) {
        this.service = service;
        this.rsmq = rsmq;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isMutant = this.service.isMutant(req.body.dna);
                if (!isMutant) {
                    res.status(403);
                }
                else {
                    res.status(200);
                }
                this.rsmq.sendMessage({
                    qname: 'mutant-queue',
                    message: JSON.stringify({ dna: req.body.dna, isMutant: isMutant }),
                }, (err, resp) => {
                });
                res.send("");
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MutantController.prototype, "index", null);
MutantController = __decorate([
    inversify_express_utils_1.controller("/mutant"),
    __param(0, inversify_1.inject(types_1.TYPES.DnaServiceInterface)),
    __param(1, inversify_1.inject(rsmq_1.default)),
    __metadata("design:paramtypes", [Object, rsmq_1.default])
], MutantController);
exports.MutantController = MutantController;
//# sourceMappingURL=MutantController.js.map