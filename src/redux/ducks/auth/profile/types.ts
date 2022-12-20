import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    PERMISSIONS: '@permissions/PERMISSIONS',
    PERMISSIONS_FAILURE: '@permissions/PERMISSIONS_FAILURE',
    PERMISSIONS_SUCCESS: '@permissions/PERMISSIONS_SUCCESS',
    PROFILE_LOGOUT_SUCCESS: "@permissions/PROFILE_LOGOUT_SUCCESS"
};

export interface Response {
    data: IProfileTypes
}

export interface ResponsePermission {
    data: number[]
}


export interface IStoreProfile {
    id: any;
    operatorId: number;
    storeId: number;
    name: string;

}
export interface IProfile {   
    name: string;
}

export interface IProfileTypes {
    permissions: [], 
    name: string,
    isValidUser: true,
    loadingUser: false,
    loadingPermission: true,
    error: false,
}
