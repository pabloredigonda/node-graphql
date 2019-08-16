'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_config_1 = require("./inversify.config");
const types_1 = require("./types");
const rsmq_worker_1 = __importDefault(require("rsmq-worker"));
const repository = inversify_config_1.container.get(types_1.TYPES.RepositoryInterface);
const worker = inversify_config_1.container.get(rsmq_worker_1.default);
console.log("WORKER start");
worker.on("message", function (msg, next, id) {
    const message = JSON.parse(msg);
    console.log('new message received:');
    repository.addDna(message.dna, message.isMutant, (doc) => {
        console.log('new dna inserted:');
        // console.log(doc)
    });
    next();
});
// optional error listeners
worker.on('error', function (err, msg) {
    console.log("ERROR", err, msg.id);
});
worker.on('exceeded', function (msg) {
    console.log("EXCEEDED", msg.id);
});
worker.on('timeout', function (msg) {
    console.log("TIMEOUT", msg.id, msg.rc);
});
worker.start();
//# sourceMappingURL=worker.js.map