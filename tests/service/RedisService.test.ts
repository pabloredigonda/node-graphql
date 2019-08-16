'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import {RedisClient} from 'redis'
import 'reflect-metadata'
import { container } from "../../src/server/inversify.config"
import { TYPES } from "../../src/server/types"
import { RedisServiceInterface } from "../../src/server/interfaces"

const redisService = container.get<RedisServiceInterface>(TYPES.RedisServiceInterface)

describe('Redis Service', function() {
  it('getClient()', function() {
	let client = redisService.getClient();
    expect(client).to.be.an('object')
    assert.instanceOf(client, RedisClient, 'client is an instance of RedisClient');
  });
});

