/*
export default interface OmdbResponseBodyInterface {
    totalResults: string;
    Response: String;
    Search: String;
}
*/

export default interface OmdbResponseBodyInterface { 
    statusCode: number;
    result: {
        totalResults: string;
        Response: String;
        Search: String;
    };
    headers: Array<string>;
    totalResults: string;
    Response: String;
    Search: String;
}