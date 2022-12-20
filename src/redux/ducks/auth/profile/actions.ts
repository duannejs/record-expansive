import { action } from "typesafe-actions"
import { IProfileTypes, Types } from "./types"



export const PermissionUser = (idCliente: number) => {
    return action(Types.PERMISSIONS , { idCliente });
}

export const PermissionUserSuccess = (payload: number[]) => {
    return action(Types.PERMISSIONS_SUCCESS, payload);
}



export const PermissionUserFailure = (err: number) => {
    return action(Types.PERMISSIONS_FAILURE, { err });
}

export const ProfileLogoutSuccess = () => {
    return action(Types.PROFILE_LOGOUT_SUCCESS);
}