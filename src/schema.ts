'use strict'
import ResolverInterface from './interfaces/ResolverInterface'
import AuthorizationServiceInterface from './interfaces/AuthorizationServiceInterface'
import container from './dependencies'
import { TYPES } from './types';
import { gql, AuthenticationError } from 'apollo-server';

const moviesResolver = container.get<ResolverInterface>(TYPES.MoviesResolver)
const loginResolver = container.get<ResolverInterface>(TYPES.LoginResolver)
const authorizationService = container.get<AuthorizationServiceInterface>(TYPES.AuthorizationServiceInterface)

/**
 * 
 * @param parent 
 * @param args 
 * @param context 
 * @param info 
 */
const searchWrapper = (parent:any, args: Object, context, info) => {
    if (context.user == undefined){
        throw new AuthenticationError('you must be logged in');
    }

    return moviesResolver.resolve(args)
}

/**
 * 
 * @param parent 
 * @param args 
 * @param context 
 * @param info 
 */
const loginWrapper = (parent: any, args: Object, context, info) => {
    return loginResolver.resolve(args)
}

/**
 * 
 * @param param0 
 */
const appendUserId = async ({ req }) => {
    const token = req.headers.authorization || '';

    if(!token.length){
        return null
    }

    const user = await authorizationService.getUser(token);
    if (user){
        return {user}
    }
    return null         
}

/**
 * typeDefs
 */
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

    type AuthPayload {
        token: String,
        userId: Int
    }

    type Query {
        searchMovies(
            s: String!, 
            type: String, 
            page: Int
        ): SearchResult
    }
    type Mutation {
        login(email: String!, password: String!): AuthPayload
    }
`;

/**
 * RESOLVERS
 */
const resolvers = {
    Query: {
        searchMovies: searchWrapper,
    },
    Mutation: {
        login: loginWrapper,
    },
};

const schema = { 
    typeDefs, 
    resolvers,
    context: appendUserId 
  }

export default schema