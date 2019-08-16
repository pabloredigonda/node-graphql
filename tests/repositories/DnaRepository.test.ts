'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect, assert } from 'chai'
import sinon from 'sinon'
import 'reflect-metadata'
import { container } from "../../src/server/inversify.config"
import { TYPES } from "../../src/server/types"
import { RepositoryInterface  } from "../../src/server/interfaces"
import DnaModel from '../../src/server/models/DnaModel'


let jsonString = "{\n    \"count_mutant_dna\": 1,\n    \"count_human_dna\": 1,\n    \"ratio\": 1\n}"
let jsonObject = JSON.parse(jsonString)

describe('Repository', function() {

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

		let DnaModelMock =  {
			aggregate: (query, callback) => { 
				let result = [{
					mutants:1,
					total:2
				}] 
				callback(null, result)
			}
		}

        container.rebind(DnaModel).toConstantValue(DnaModelMock);

		const repository = container.get<RepositoryInterface>(TYPES.RepositoryInterface)
		let data = await repository.getStats()
		
		expect(data).to.deep.equal(jsonObject);
	});
	
	it('getStats error()', async () => {

		let DnaModelMock =  {
			aggregate: (query, callback) => { 
				let result = [{
					mutants:1,
					total:2
				}] 
				callback(new Error("Error de prueba"), result)
			}
		}

        container.rebind(DnaModel).toConstantValue(DnaModelMock);

		const repository = container.get<RepositoryInterface>(TYPES.RepositoryInterface)
		
		
		try {
	      let data = await repository.getStats()
	      assert.fail('expected exception not thrown');
	    } catch (e) { 
	      assert.equal(e.message, 'Error de prueba');
	    }
		
	});


	it('addDna()', async () => {

		let DnaModelMock = function (json) {
			this.dna = json.dna
			this.isMutant= json.isMutant
		};
		
		DnaModelMock.prototype.save = async () => {}

        container.rebind(DnaModel).toConstantValue(DnaModelMock);

		const repository = container.get<RepositoryInterface>(TYPES.RepositoryInterface)

		let document = {
			dna: "AAA",
			isMutant: true
		}

		return repository.addDna(document.dna, document.isMutant, (err, doc)=>{
			expect(doc.dna).to.deep.equal(document.dna)
			expect(doc.isMutant).to.deep.equal(document.isMutant)
		})

	});

});

