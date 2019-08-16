"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
let DnaService = class DnaService {
    constructor() {
        this.found = 0;
    }
    /* Esta funccio recibe un array representando un ADN
    y busca determinar si el AND es de un mutante.
    Si el ADN es de un mutante devuelve TRUE y en caso
    contrario devuelve FALSE
    
    Ejemplo:
    dna = ["AAAA","ATCT","AGTC","ACGA"]
    retult= true */
    isMutant(dna) {
        this.dna = dna;
        this.found = 0;
        let n = dna.length;
        let max = n - 4;
        for (let x = 0; x < n; x++) {
            for (let z = 0; z < n; z++) {
                //busco Bottom
                if (x <= max && this.check(x, z, x + 1, z, x + 2, z, x + 3, z)) {
                    return true;
                }
                //Busco Right
                if (z <= max && this.check(x, z, x, z + 1, x, z + 2, x, z + 3)) {
                    return true;
                }
                //Busco Botom Right
                if (x <= max && z <= max && this.check(x, z, x + 1, z + 1, x + 2, z + 2, x + 3, z + 3)) {
                    return true;
                }
                //Busco Right Botom 
                if (z > max && x <= max && this.check(x, z, x + 1, z - 1, x + 2, z - 2, x + 3, z - 3)) {
                    return true;
                }
            }
        }
        return false;
    }
    /* Esta función compara 4 valores del array dna y si todos
    son iguales devuelve TRUE, en caso contrario devuelve FALSE.

    Recibe 8 parámetros numéricos los cuales corresponden a coordenadas del array dna.
    los dos primeros son las coordenadas x-z de la primer posición la cual se va a
    comparar con los otros 3 */
    check(x1, z1, x2, z2, x3, z3, x4, z4) {
        if (this.dna[x1][z1] == this.dna[x2][z2] && this.dna[x1][z1] == this.dna[x3][z3] && this.dna[x1][z1] == this.dna[x4][z4]) {
            this.found++;
            if (this.found > 1) {
                return true;
            }
        }
        return false;
    }
};
DnaService = __decorate([
    inversify_1.injectable()
], DnaService);
exports.default = DnaService;
//# sourceMappingURL=DnaService.js.map