import 'reflect-metadata';
import { Container, interfaces } from "inversify";
import { TYPES } from "./types";
/**
 * Interfaces
 */
import RedisServiceInterface from './interfaces/RedisServiceInterface' 
import OmdbServiceInterface from './interfaces/OmdbServiceInterface'
import CacheServiceInterface from './interfaces/CacheServiceInterface'
import AuthorizationServiceInterface from './interfaces/AuthorizationServiceInterface'
import OmdbResponseBodyInterface from './interfaces/OmdbResponseBodyInterface'
import FormatterInterface from './interfaces/FormatterInterface'
import ResolverInterface from './interfaces/ResolverInterface'
/**
 * Services
 */
import AuthorizationService from "./service/AuthorizationService";
import CacheService from "./service/CacheService";
import RedisService from "./service/RedisService";
import OmdbService from "./service/OmdbService";
import FormatterService from "./service/FormatterService";
import MoviesResolver from "./resolvers/MoviesResolver";
import LoginResolver from "./resolvers/LoginResolver";
import * as rm from 'typed-rest-client/RestClient';
import jwt from 'jsonwebtoken'


const container = new Container();

container.bind<ResolverInterface>(TYPES.MoviesResolver).to(MoviesResolver).inSingletonScope();
container.bind<ResolverInterface>(TYPES.LoginResolver).to(LoginResolver).inSingletonScope();
container.bind<CacheServiceInterface>(TYPES.CacheServiceInterface).to(CacheService).inSingletonScope();
container.bind<FormatterInterface>(TYPES.FormatterInterface).to(FormatterService).inSingletonScope();

container.bind<AuthorizationService>(TYPES.AuthorizationServiceInterface).toDynamicValue((context: interfaces.Context) => { 
	return new AuthorizationService(process.env.AUTH0_CLIENT_SECRET, jwt) 
}).inSingletonScope();


container.bind<RedisServiceInterface>(TYPES.RedisServiceInterface).toDynamicValue((context: interfaces.Context) => { 
	return new RedisService(process.env.REDIS_HOST, parseInt(process.env.REDIS_PORT)) 
}).inSingletonScope();

container.bind<rm.RestClient>(TYPES.RestClient).toDynamicValue((context: interfaces.Context) => { 
	return new rm.RestClient(process.env.OMDB_API_NAME, process.env.OMDB_API_URL) 
}).inSingletonScope();

container.bind<OmdbServiceInterface>(TYPES.OmdbServiceInterface).toDynamicValue((context: interfaces.Context) => { 
	return new OmdbService(
		container.get<rm.RestClient>(TYPES.RestClient), 
		process.env.OMDB_API_KEY,
		container.get<FormatterInterface>(TYPES.FormatterInterface), 
	)
}).inSingletonScope();

export default container;
