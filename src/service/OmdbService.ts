"use strict"; 
import * as rm from 'typed-rest-client/RestClient';
import { injectable, inject } from "inversify";
import OmdbServiceInterface from '../interfaces/OmdbServiceInterface'
import OmdbResponseBodyInterface from '../interfaces/OmdbResponseBodyInterface'
import FormatterInterface from '../interfaces/FormatterInterface'
import { ApolloError } from 'apollo-server';
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
class OmdbService implements OmdbServiceInterface{

	private readonly client: rm.RestClient
	private readonly apikey: string
	private readonly formatter: FormatterInterface;
	private readonly types = ['movie','episode', 'series']
	/**
	 * 
	 * @param client rm.RestClient
	 * @param apikey String
	 * @param formatter FormatterInterface
	 */
	public constructor(
		client: rm.RestClient, 
		apikey: string, 
		@inject(TYPES.FormatterInterface) formatter: FormatterInterface
	){	
		this.client = client;
		this.apikey = apikey;
		this.formatter = formatter;
	}

	/**
	 * 
	 * @param s 
	 * @param type 
	 * @param page 
	 */
	public async search(s: string, type: string, page: number) {

		const queryString: string = this.buildQuery(s, type, page)

		let response: rm.IRestResponse<OmdbResponseBodyInterface> = await this.client.get<OmdbResponseBodyInterface>(queryString);		
		//Error handler
		//@TODO handle errors
			
		return this.formatter.format(response, page);
	}

	/**
	 * 
	 * @param s 
	 * @param type 
	 * @param page 
	 */
	private buildQuery(s: string, type: string, page: number): string{
		//Please fixme!
		let querystring = '/?apikey='+this.apikey+'&s='+s;

		if(type){

			if (!this.types.includes(type)){
				throw new ApolloError("The type value should by in the following list :[movie,episode, series]");
			}

			querystring+='&type=' + type;
		}

		if(page){
			querystring+='&page=' + page;
		}

		return querystring;
	}

}

export default OmdbService