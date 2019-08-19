'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import 'reflect-metadata'
import container from "../../src/server/dependencies"
import { TYPES } from "../../src/server/types"
import RedisServiceInterface from "../../src/server/interfaces/RedisServiceInterface"
import CacheServiceInterface from "../../src/server/interfaces/CacheServiceInterface"


let jsonString = "{\n    \"count_mutant_dna\": 1,\n    \"count_human_dna\": 1,\n    \"ratio\": 1\n}"
let jsonObject = JSON.parse(jsonString)

let RedisServiceMock = { 
	getClient: () => { 
		return {
			get: (key, callback) => {
				callback(null, jsonString)
			},
			set: () => {}
		}; 
	} 
};

describe('Cache Service', function() {

	beforeEach(() => {
        container.snapshot();
    });

	afterEach(() => {
        container.restore();
    });


	it('get', async () => {

        // container.unbind(TYPES.RedisServiceInterface);
        container.rebind(TYPES.RedisServiceInterface).toConstantValue(RedisServiceMock);

		const cacheService = container.get<CacheServiceInterface>(TYPES.CacheServiceInterface)
		const key = "fakekey"
		let data = await cacheService.get(key)
		expect(data).to.deep.equal(jsonObject);
	});

});

