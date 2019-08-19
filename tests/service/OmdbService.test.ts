'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import {RedisClient} from 'redis'
import 'reflect-metadata'
import container from "../../src/server/dependencies"
import { TYPES } from "../../src/server/types"
import OmdbServiceInterface from "../../src/server/interfaces/OmdbServiceInterface"

let output = {
	"movies": [
		{
			"id": "tt0106849",
			"poster": "https://m.media-amazon.com/SX300.jpg",
			"title": "Extralarge: Ninja Shadow",
			"type": "movie",
			"year": "1993"
		}
	],
	"nextPage": 3,
	"prevPage": 1,
	"totalPages": 58
}

let RestClientMock = { 
	get: () => { 
		return { 
			statusCode: 200,
			result: { 
				Search:[ 
					{
					"Title": "Extralarge: Ninja Shadow",
					"Year": "1993",
					"imdbID": "tt0106849",
					"Type": "movie",
					"Poster": "https://m.media-amazon.com/SX300.jpg"
					}
				],
				totalResults: '578',
				Response: 'True'
			}
		} 	
	}
}

describe('OmdbServiceShould', function() {

	beforeEach(() => {
        container.snapshot();
    });

	afterEach(() => {
        container.restore();
    });


	it('returnsJsonOnSearch', async () => {

        container.rebind(TYPES.RestClient).toConstantValue(RestClientMock);

		const omdbService = container.get<OmdbServiceInterface>(TYPES.OmdbServiceInterface)
		let data = await omdbService.search("ninja", null, 2)
		expect(data).to.deep.equal(output);
	});

});

