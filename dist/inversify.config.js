/*
import 'reflect-metadata';
import { Container, interfaces } from "inversify";
import { TYPES } from "./types";
import { DbServiceInterface, RedisServiceInterface, CacheServiceInterface, DnaServiceInterface, RepositoryInterface } from "./interfaces";
import CacheService from "./service/CacheService";
import DnaService from "./service/DnaService";
import DbService from "./service/DbService";
import RedisService from "./service/RedisService";
import DnaModel from "./models/DnaModel";
import DnaRepository from "./repositories/DnaRepository";
import RedisSMQ from 'rsmq'
import RSMQWorker from 'rsmq-worker'

const container = new Container();


container.bind(DnaModel).toDynamicValue((context: interfaces.Context) => {
    return DnaModel
}).inSingletonScope();

container.bind<DnaServiceInterface>(TYPES.DnaServiceInterface).to(DnaService).inSingletonScope();
container.bind<CacheServiceInterface>(TYPES.CacheServiceInterface).to(CacheService).inSingletonScope();
container.bind<RepositoryInterface>(TYPES.RepositoryInterface).to(DnaRepository).inSingletonScope();

container.bind<DbServiceInterface>(TYPES.DbServiceInterface).toDynamicValue((context: interfaces.Context) => {
    return new DbService(process.env.DB_HOST, process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS)
}).inSingletonScope();

container.bind<RedisServiceInterface>(TYPES.RedisServiceInterface).toDynamicValue((context: interfaces.Context) => {
    return new RedisService(process.env.REDIS_HOST, parseInt(process.env.REDIS_PORT))
}).inSingletonScope();

container.bind<RedisSMQ>(RedisSMQ).toDynamicValue((context: interfaces.Context) => {
    const rsmq = new RedisSMQ({
        ns: "rsmq",
        client: container.get<RedisServiceInterface>(TYPES.RedisServiceInterface).getClient()
    })

    rsmq.createQueue({ qname: process.env.REDIS_QUEUE}, (err, resp) => {})

    return rsmq
}).inSingletonScope();

container.bind<RSMQWorker>(RSMQWorker).toDynamicValue((context: interfaces.Context) => {
    return new RSMQWorker( process.env.REDIS_QUEUE, {host: process.env.REDIS_HOST} )
}).inSingletonScope();


container.get<DbServiceInterface>(TYPES.DbServiceInterface)

export { container };

*/ 
//# sourceMappingURL=inversify.config.js.map