'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon'
import {RedisClient} from 'redis'
import 'reflect-metadata'
import container from "../../src/dependencies"
import { TYPES } from "../../src/types"
import ResolverInterface from "../../src/interfaces/ResolverInterface"

chai.use(chaiAsPromised)

const fakeToken = "faketoken"
const fakeResult = {
	token: fakeToken,
	userId: 1
}

const AutorizationServiceMock = { 
	login: (userId) => fakeToken
}

describe('LoginResolverShould', function() {

	beforeEach(() => {
        container.snapshot();
    });

	afterEach(() => {
        container.restore();
    });
	
	it('returnsTokenForValidCredentials', async () => {
				
		container.rebind(TYPES.AuthorizationServiceInterface).toConstantValue(AutorizationServiceMock)
		const resolver = container.get<ResolverInterface>(TYPES.LoginResolver)

		let params = {			
			email: "test@mail.com",
			password: "testpassword"
		}

		let data = await resolver.resolve(params)
		chai.expect(data).to.deep.equal(fakeResult);
	});

	/*
	it('ThrowAnExceptionForInvalidCredentials', async () => {

        container.rebind(TYPES.AuthorizationServiceInterface).toConstantValue(AutorizationServiceMock)
		const resolver = container.get<ResolverInterface>(TYPES.LoginResolver)

		let params = {			
			email: "wrong@mail.com",
			password: "wrongpassword"
		}

		chai.expect(() =>  {
			try{
				let data = resolver.resolve(params)
			}catch(error){
				throw error
			}
            
        }).to.throw(Error)		
	});

	*/
});

