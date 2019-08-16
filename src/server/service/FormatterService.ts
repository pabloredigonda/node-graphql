"use strict"; 
import { injectable, inject } from "inversify";
import * as rm from 'typed-rest-client/RestClient';
import FormatterInterface from '../interfaces/FormatterInterface'
import OmdbResponseBodyInterface from '../interfaces/OmdbResponseBodyInterface'
import OmdbResultInterface from '../interfaces/OmdbResultInterface'

import 'reflect-metadata';

@injectable()
class FormatterService implements FormatterInterface{

	private readonly resultsPerPage: number = 10;

    /**
     * 
     * @param response 
     * @param page 
     */
	public format(response: rm.IRestResponse<OmdbResponseBodyInterface>, page :number) {
		
		console.log("################");
		console.log(response);
		console.log("################");

		const rows = response.result.Search.length
		const totalResults = parseInt(response.result.totalResults)
        
        let result = this.formatPagination(page, totalResults)

		for (var i = 0, len = rows; i < len; i++) {
            result.movies.push(this.formatMovie(response.result.Search[i]));
		}
	
		return result;
	}

    /**
     * 
     * @param page number
     * @param totalResults number
     */
	private formatPagination (page: number, totalResults: number){	
		const totalPages = Math.ceil(totalResults/this.resultsPerPage)

		return {
			prevPage: page > 1 ? page-1 : page,
			nextPage: page < totalPages ? page +1 : page,
			totalPages: totalPages,
			movies: []
		}		
	}

    /**
     * 
     * @param result 
     */
	private formatMovie(result) {
		return {
			id: result.imdbID,
			title: result.Title,
			year: result.Year,
			type: result.Type,
			poster: result.Poster
		};
	}
}

export default FormatterService