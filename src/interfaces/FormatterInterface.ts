import * as rm from 'typed-rest-client/RestClient';
import OmdbResponseBodyInterface from '../interfaces/OmdbResponseBodyInterface'

export default interface FormatterInterface {
    format(response: rm.IRestResponse<OmdbResponseBodyInterface>, page :number)	
}