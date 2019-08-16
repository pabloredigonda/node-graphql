'use strict'
import ResolverInterface from './interfaces/ResolverInterface'
import container from './dependencies'
import { TYPES } from './types';
import { gql } from 'apollo-server';

const resolver = container.get<ResolverInterface>(TYPES.ResolverInterface)

const searchMovies = (_:any, args: Object) => {
    return resolver.resolve(args)
}

const typeDefs = gql`
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

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        searchMovies: searchMovies,
    },
};

export { typeDefs, resolvers, searchMovies}