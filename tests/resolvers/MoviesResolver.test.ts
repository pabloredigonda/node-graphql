'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import {RedisClient} from 'redis'
import 'reflect-metadata'
import container from "../../src/server/dependencies"
import { TYPES } from "../../src/server/types"
import ResolverInterface from "../../src/server/interfaces/ResolverInterface"

let outputFromCache = {
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

let outputFromDB = {
	"movies": [
		{
			"id": "tt0106849",
			"poster": "https://m.media-amazon.com/SX300.jpg",
			"title": "Extralarge: Ninja Shadow",
			"type": "movie",
			"year": "2000"
		}
	],
	"nextPage": 3,
	"prevPage": 1,
	"totalPages": 58
}

const CacheServiceMock = { 
	get: (key) => { 
		return outputFromCache	
	},
	set: (key, data) => {

	}
}

const CacheServiceEmptyMock = { 
	get: (key) => { 
		return null	
	},
	set: (key, data) => {

	}
}

const OmdbServiceMock = {
	search: (s: string, type: string, page: number) => {
		return outputFromDB
	}
}

describe('MoviesResolverShould', function() {

	beforeEach(() => {
        container.snapshot();
    });

	afterEach(() => {
        container.restore();
    });


	it('returnsFromCache', async () => {

        container.rebind(TYPES.OmdbServiceInterface).toConstantValue(OmdbServiceMock)
		container.rebind(TYPES.CacheServiceInterface).toConstantValue(CacheServiceMock)

		const resolver = container.get<ResolverInterface>(TYPES.ResolverInterface)
		let params = {s:"ninja", page:2}
		let data = await resolver.resolve(params)
		expect(data).to.deep.equal(outputFromCache);
	});

	it('returnsFromDb', async () => {

        container.rebind(TYPES.OmdbServiceInterface).toConstantValue(OmdbServiceMock)
		container.rebind(TYPES.CacheServiceInterface).toConstantValue(CacheServiceEmptyMock)

		const resolver = container.get<ResolverInterface>(TYPES.ResolverInterface)
		let params = {s:"ninja", page:2}
		let data = await resolver.resolve(params)
		expect(data).to.deep.equal(outputFromDB);
	});

});

