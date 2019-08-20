'use strict'
import ResolverInterface from '../interfaces/ResolverInterface'
import AuthorizationServiceInterface from '../interfaces/AuthorizationServiceInterface'
import LoginParamsInterface from '../interfaces/LoginParamsInterface'
import { injectable, inject } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../types"

@injectable()
class LoginResolver implements ResolverInterface{

    private readonly authorizationService: AuthorizationServiceInterface
    private readonly user = {
        id:1,
        email: "test@mail.com",
        password: "testpassword"
    }

    /**
     * 
     * @param authorizationService AuthorizationServiceInterface
     */

    public constructor(
        @inject(TYPES.AuthorizationServiceInterface) authorizationService: AuthorizationServiceInterface
    ){	
        this.authorizationService = authorizationService;
    }

    /**
     * 
     * @param args LoginParamsInterface
     */
    public async resolve(args: LoginParamsInterface){              
            
        if (args.email!=this.user.email || args.password!=this.user.password) {
            console.log(args)
            throw new Error('Invalid credentials')
        }                
        
        const token = this.authorizationService.login(this.user.id)        
        return {
            token: token,
            userId: this.user.id
        }
    }    
}

export default LoginResolver