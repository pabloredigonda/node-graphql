"use strict"; 
import * as rm from 'typed-rest-client/RestClient';
import { injectable, inject } from "inversify";
import OmdbServiceInterface from '../interfaces/OmdbServiceInterface'
import OmdbResponseBodyInterface from '../interfaces/OmdbResponseBodyInterface'
import FormatterInterface from '../interfaces/FormatterInterface'
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
class OmdbService implements OmdbServiceInterface{

	private readonly client: rm.RestClient
	private readonly apikey: String
	private readonly formatter: FormatterInterface;

	/**
	 * 
	 * @param client rm.RestClient
	 * @param apikey String
	 * @param formatter FormatterInterface
	 */
	public constructor(
		client: rm.RestClient, 
		apikey: String, 
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
	public async search(s: String, type: String, page: number) {

		//Please fixme!
		//let querystring = '/?i=tt3896198&apikey='+this.apikey+'&s='+s+'&type=series';
		let querystring = '/?apikey='+this.apikey+'&s='+s;

		if(type){
			querystring+='&type=' + type;
		}

		if(page){
			querystring+='&page=' + page;
		}

		let response: rm.IRestResponse<OmdbResponseBodyInterface> = await this.client.get<OmdbResponseBodyInterface>(querystring);		
		//Error handler
		//@TODO handle errors
		if(response.result.Response === "False"){
			//error?

		}
	
		return this.formatter.format(response, page);
	}

}

export default OmdbService