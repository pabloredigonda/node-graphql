"use strict"; 
import Redis from 'redis'
import { injectable, inject } from "inversify";
import AuthorizationServiceInterface from "../interfaces/AuthorizationServiceInterface"
import { TYPES } from "../types";
import 'reflect-metadata';
import { AuthenticationError } from 'apollo-server';

@injectable()
class AuthorizationService implements AuthorizationServiceInterface {
	
	private secret: string
	private jwt
	
	/**
	 * 
	 * @param secret 
	 */
 
	public constructor(secret: string, jwt){
		this.secret = secret
		this.jwt = jwt
	}

	/**
	 * 
	 * @param token 
	 */

	public async getUser(token: string) {

		try{
			if(!token){
				throw new AuthenticationError('Invalid token string')
			}
	
			token = token.replace('Bearer ', '')
			const user = await this.jwt.verify(token, this.secret)		
			return user.userId

		}catch(error){
			throw new AuthenticationError('Invalid token')
		}
		
	}
	
	/**
	 * 
	 * @param userId 
	 */
	public login(userId: number) {
		return this.jwt.sign({ userId: userId }, this.secret)
	}
}

export default AuthorizationService