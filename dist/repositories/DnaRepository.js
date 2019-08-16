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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DnaModel_1 = __importDefault(require("../models/DnaModel"));
const inversify_1 = require("inversify");
require("reflect-metadata");
let DnaRepository = class DnaRepository {
    constructor(model) {
        this.query = [
            { $project: {
                    _id: 0,
                    total: { $sum: 1 },
                    mutants: { $cond: [{ $eq: ['$isMutant', true] }, 1, 0] }
                } },
            { $group: {
                    _id: 1,
                    mutants: { $sum: '$mutants' },
                    total: { $sum: 1 }
                } }
        ];
        this.model = model;
        this.format = this.format.bind(this);
    }
    addDna(dna, isMutant, callback) {
        let doc = new this.model({ dna: dna, isMutant: isMutant });
        doc.save();
        callback(null, doc);
    }
    getStats() {
        return new Promise((resolve, reject) => {
            this.model.aggregate(this.query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(this.format(result));
            });
        });
    }
    format(result) {
        if (typeof result == 'object' && typeof result[0] == 'undefined') {
            return {
                count_mutant_dna: 0,
                count_human_dna: 0,
                ratio: 0
            };
        }
        return {
            count_mutant_dna: result[0].mutants,
            count_human_dna: result[0].total - result[0].mutants,
            ratio: result[0].mutants / (result[0].total - result[0].mutants)
        };
    }
};
DnaRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(DnaModel_1.default)),
    __metadata("design:paramtypes", [Object])
], DnaRepository);
exports.default = DnaRepository;
//# sourceMappingURL=DnaRepository.js.map