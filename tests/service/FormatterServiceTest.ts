'use strict'
import * as dotenv from 'dotenv';
dotenv.config({path: '/usr/src/service/dist/.env'});

import { expect } from 'chai'
import 'reflect-metadata'
import container from "../../src/server/dependencies"
import {TYPES} from "../../src/server/types"
import FormatterInterface from "../../src/server/interfaces/FormatterInterface"

const formatter = container.get<FormatterInterface>(TYPES.FormatterInterface)

describe('format', function() {
  it('mutant1', function() {

    /*
    let input = {                
        statusCode: 200,
        headers: [],
        "Search": [
            {
                "Title": "Extralarge: Ninja Shadow",
                "Year": "1993",
                "imdbID": "tt0106849",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BNzk5N2E0MDYtOTUxMS00ZmM3LWJlNjctODc3ODNlNjk2N2IwXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"
            }
        ],
        "totalResults": "578",
        "Response": "True"
            
    }     
*/
    const input = { statusCode: 200,
      result:
       { Search:
          [ 
            {
              "Title": "Extralarge: Ninja Shadow",
              "Year": "1993",
              "imdbID": "tt0106849",
              "Type": "movie",
              "Poster": "https://m.media-amazon.com/images/M/MV5BNzk5N2E0MDYtOTUxMS00ZmM3LWJlNjctODc3ODNlNjk2N2IwXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"
          }
          ],
         totalResults: '578',
         Response: 'True' },
      headers:
       { date: 'Fri, 16 Aug 2019 17:59:27 GMT',
         'content-type': 'application/json; charset=utf-8',
         'content-length': '2015',
         connection: 'close',
         'set-cookie':
          [ '__cfduid=db08fbd737d66c2b7a240252af832ff731565978367; expires=Sat, 15-Aug-20 17:59:27 GMT; path=/; domain=.omdbapi.com; HttpOnly' ],
         'cache-control': 'public, max-age=86400',
         expires: 'Sat, 17 Aug 2019 17:59:27 GMT',
         'last-modified': 'Thu, 15 Aug 2019 18:17:10 GMT',
         vary: '*',
         'x-aspnet-version': '4.0.30319',
         'x-powered-by': 'ASP.NET',
         'access-control-allow-origin': '*',
         'cf-cache-status': 'HIT',
         age: '85336',
         'accept-ranges': 'bytes',
         server: 'cloudflare',
         'cf-ray': '50754d5e0d5a67a1-EZE' } }
    



    
    let output = {
      "title": "Extralarge: Ninja Shadow",
      "year": "1993",
      "id": "tt0106849",
      "type": "movie",
      "poster": "https://m.media-amazon.com/images/M/MV5BNzk5N2E0MDYtOTUxMS00ZmM3LWJlNjctODc3ODNlNjk2N2IwXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"
    }


    let result = formatter.format(input, 1);
    expect(result).equal(output);
  });

  
});

