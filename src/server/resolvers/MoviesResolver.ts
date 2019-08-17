'use strict'
import ResolverInterface from '../interfaces/ResolverInterface'
import OmdbServiceInterface from '../interfaces/OmdbServiceInterface'
import CacheServiceInterface from '../interfaces/CacheServiceInterface'
import SearchParamsInterface from '../interfaces/SearchParamsInterface'

import { injectable, inject } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../types"

@injectable()
class MoviesResolver implements ResolverInterface{

    private readonly omdbService: OmdbServiceInterface
    private readonly cacheService: CacheServiceInterface

    /**
     * 
     * @param omdbService OmdbServiceInterface
     * @param cacheService CacheServiceInterface
     */
    public constructor(
        @inject(TYPES.OmdbServiceInterface) omdbService: OmdbServiceInterface, 
        @inject(TYPES.CacheServiceInterface) cacheService: CacheServiceInterface
    ){	
        this.omdbService = omdbService;
        this.cacheService = cacheService;
    }

    /**
     * 
     * @param args SearchParamsInterface
     */
    public async resolve(args: SearchParamsInterface){
        const type = args.type !== undefined ? args.type : '';
        const page = args.page !== undefined ? parseInt(args.page) : 1;
        const key = `${args.s}-${page}-${type}`;        
            
        let data = await this.cacheService.get(key)
        
        if(!data){
                
            console.log("get from API")
                
            data = await this.omdbService.search(args.s, type, page)
                
            console.log("Set in  cache")	
                   
            this.cacheService.set(key, data)
        }

        return data
    }    
}

export default MoviesResolver