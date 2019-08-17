'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = __importDefault(require("./dependencies"));
const types_1 = require("./types");
const apollo_server_1 = require("apollo-server");
const resolver = dependencies_1.default.get(types_1.TYPES.ResolverInterface);
const searchMovies = (_, args) => {
    return resolver.resolve(args);
};
exports.searchMovies = searchMovies;
const typeDefs = apollo_server_1.gql `
    type Movie {
        id: String
        title: String
        year: String
        type: String
        poster: String
    }
    type SearchResult {
        movies: [Movie]    
        prevPage: Int
        nextPage: Int
        totalPages: Int
    }
    type Query {
        searchMovies(
            s: String!, 
            type: String, 
            page: Int
        ): SearchResult
    }
`;
exports.typeDefs = typeDefs;
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        searchMovies: searchMovies,
    },
};
exports.resolvers = resolvers;
//# sourceMappingURL=schema.js.map