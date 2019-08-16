"use strict"; 
import Redis from 'redis'
import { injectable, inject } from "inversify";
import RedisServiceInterface from "../interfaces/RedisServiceInterface"
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
class RedisService implements RedisServiceInterface{
	
	private readonly client
	
	/**
	 * 
	 * @param host 
	 * @param port 
	 */
	public constructor(host: string, port: number){
		this.client = Redis.createClient(port, host, {
			no_ready_check: true
		})
		
		this.client.on("error", function (err) {
			console.log("Redis connection error " + err);
		});
	}

	/**
	 * 
	 */
	public getClient() {
		return this.client
    }
}

export default RedisService