"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.DnaSchema = new mongoose_1.Schema({
    dna: {
        type: String,
        required: true,
        unique: true
    },
    isMutant: {
        type: Boolean,
        required: true
    }
});
const DnaModel = mongoose_1.model("dna", exports.DnaSchema);
exports.default = DnaModel;
//# sourceMappingURL=DnaModel.js.map