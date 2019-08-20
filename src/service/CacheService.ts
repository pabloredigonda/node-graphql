"use strict"; 
import RedisServiceInterface from "../interfaces/RedisServiceInterface"
import CacheServiceInterface from "../interfaces/CacheServiceInterface"
import { TYPES } from "../types"
import RedisService from "../service/RedisService"
import { injectable, inject } from "inversify";
import 'reflect-metadata';

@injectable()
class CacheService implements CacheServiceInterface{
	
	private service: RedisServiceInterface
	private expire = 120;

	/**
	 * 
	 * @param service RedisServiceInterface
	 */
	public constructor (
        @inject(TYPES.RedisServiceInterface) service: RedisServiceInterface
    ) {
        this.service = service;
    }

	/**
	 * 
	 * @param key string
	 */
	public get (key: string) {
		return new Promise((resolve, reject) => {
			this.service.getClient().get(key, (err, data) => {
				if (err) {	
					reject(err)
				}	

				if(data !=null){
					data = JSON.parse(data)
				}

				resolve(data)
			})
		})
	}

	/**
	 * 
	 * @param key string
	 * @param data JSON
	 */
	public set (key: string, data: JSON) {
		this.service.getClient().set(key, JSON.stringify(data), 'EX', this.expire)
    }
}

export default CacheService