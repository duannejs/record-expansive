import { IUser, Types } from './types';
import { action } from 'typesafe-actions';
import { stateStorage } from '../../../../service/api/apiRoutes';



export const SessionUser = (username: string, password: string) => {
    return action(Types.SESSION, { username, password });
};

export const SessionUserFailure = (err: number) => {
    return action(Types.SESSION_FAILURE, { err });
};

export const SessionUserSuccess = (user: IUser) => {
    stateStorage.setToken(user.token);
    return action(Types.SESSION_SUCCESS, { user });
};

export const userLogout = () => {
    stateStorage.logout();
    return action(Types.USER_LOGOUT);
  };

export const SessionLogout = () => {
    return action(Types.LOGOUT, {});
};

export const SessionLogoutFailure = () => {
    return action(Types.LOGOUT_FAILURE, {});
};

export const SessionLogoutSuccess = () => {
    return action(Types.LOGOUT_SUCCESS, {});
};

