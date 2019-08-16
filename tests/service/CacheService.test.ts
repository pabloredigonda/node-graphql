'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import {RedisClient} from 'redis'
import 'reflect-metadata'
import { container } from "../../src/server/inversify.config"
import { TYPES } from "../../src/server/types"
import { RedisServiceInterface, CacheServiceInterface } from "../../src/server/interfaces"



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
        // create a snapshot so each unit test can modify 
        // it without breaking other unit tests
        container.snapshot();
    });

	afterEach(() => {

        // Restore to last snapshot so each unit test 
        // takes a clean copy of the application container
        container.restore();
    });


	it('getStats()', async () => {

        // container.unbind(TYPES.RedisServiceInterface);
        container.rebind(TYPES.RedisServiceInterface).toConstantValue(RedisServiceMock);

		const cacheService = container.get<CacheServiceInterface>(TYPES.CacheServiceInterface)
		let data = await cacheService.getStats()
		expect(data).to.deep.equal(jsonObject);
	});

});

