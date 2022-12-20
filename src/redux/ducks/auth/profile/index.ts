/* eslint-disable no-case-declarations */
import { Types, IProfileTypes } from './types';

const INITIAL_STATE: IProfileTypes = {   
    permissions: [], 
    name: '',
    isValidUser: true,
    loadingUser: false,
    loadingPermission: true,
    error: false
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {        
        case Types.PERMISSIONS:           
            return { ...state, loadingPermission: true, error: false, userInfo: { id: action.payload.idCliente } };
        case Types.PERMISSIONS_SUCCESS:          
            return { ...state, loadingPermission: false, error: false, userInfo: { permissions: action.payload } }
        case Types.PERMISSIONS_FAILURE:
            return { ...state, loadingPermission: false, error: true };
        case Types.PROFILE_LOGOUT_SUCCESS:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};

export default reducer;
