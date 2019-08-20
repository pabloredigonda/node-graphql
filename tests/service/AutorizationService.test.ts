'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import 'reflect-metadata'
import container from "../../src/dependencies"
import { TYPES } from "../../src/types"
import AuthorizationServiceInterface from "../../src/interfaces/AuthorizationServiceInterface"
import AuthorizationService from "../../src/service/AuthorizationService"

const spectedToken = 'aaaa'
const spectedUserId = 1
let JwtMock = { 
	verify: (token, secret) => { 

		console.log("verify")

		return {
			userId: spectedUserId
		}; 
	},
	sign: (data, secret) => {
		return spectedToken
	}
};

const autorizationService = new AuthorizationService("saraza", JwtMock)

describe('Autorization Service', function() {

	beforeEach(() => {
        container.snapshot();
    });

	afterEach(() => {
        container.restore();
    });

	it('login function should returns an access token string', async () => {      
		let token = autorizationService.login(spectedUserId)
		expect(token).to.deep.equal(spectedToken);
	});

	it('getUser function should returns an user id', async () => {      
		let userId = await autorizationService.getUser(spectedToken)
		expect(userId).to.deep.equal(spectedUserId);
	});

});


