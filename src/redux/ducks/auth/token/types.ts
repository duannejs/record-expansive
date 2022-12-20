import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    SESSION: '@user/SESSION',
    SESSION_FAILURE: '@user/SESSION_FAILURE',
    SESSION_SUCCESS: '@user/SESSION_SUCCESS',
    LOGOUT: '@user/LOGOUT',
    LOGOUT_FAILURE: '@user/LOGOUT_FAILURE',
    LOGOUT_SUCCESS: '@user/LOGOUT_SUCCESS',
    USER_LOGOUT: '@user/USER_LOGOUT'
    
};


export interface IUser {
    master: boolean | undefined;
    companies: ICompany[];
    id: number;
    name: string;
    email: string;
    token: string;
  }
  


export interface ICompany {
    id: number;
    logo: string;
    name: string;
}

export interface IApiUrls {
    key: string;
    url: string;
}



export interface ITokenTypes {
    isValidUser: any;
    user: IUser ;
    name: string | null;
    master: boolean;
    loading: boolean;
    error: boolean;
}

export interface Response {
    data: IUser
}

export interface ISignInDTO {
    company: ICompanyDTO;
    accessToken: string;
    ambient: string;
    minutesToExpire: number;
    refreshToken: string;
    secondsToExpire: number;
    _links: ISignInLinkDTO;
}


export interface ICompanyDTO {
    id: number;
    logo: string;
    name: string;
}

export interface ISignInLinkDTO {
    self: ILinkDTO;
    refresh: ILinkDTO;
    detail: ILinkDTO;
    permission: ILinkDTO;
    session: ILinkDTO;
}

export interface ILinkDTO {
    href: string;
    type: HTTP_METHODS;
}
export declare enum HTTP_METHODS {
    Get = "GET",
    Post = "POST",
    Patch = "PATCH",
    Put = "PUT",
    Delete = "DELETE"
}