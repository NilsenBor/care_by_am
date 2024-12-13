import { Session,User } from 'next-auth';
import {AdapterUser} from "next-auth/adapters";

export type SessionApp = Session & { refreshToken: string,userProfile:User,accessToken:string };

export type SessionToken = Session & {
    refreshToken: string,
    userProfile:User,
    accessToken:string
}

export type SessionUser = (User | AdapterUser) & {
    refreshToken: string,
    accessToken:string
    userProfile:User
    userId:User['id']
}