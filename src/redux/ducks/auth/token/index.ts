/* eslint-disable no-case-declarations */
import { Types, ITokenTypes } from './types';

const INITIAL_STATE: ITokenTypes = {
    isValidUser: false,
    user: {
        companies: [],
        id: 0,
        name: '',
        email: '',
        token: '',
        master: false,
    },
    name: '',
    loading: false,
    error: false,
    master: false
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.SESSION:
            return { ...state, loading: true, error: false };
        case Types.SESSION_FAILURE:
            return { ...state, loading: false, error: true };
        case Types.USER_LOGOUT:
            return {
                ...state, loading: false, error: false, logged: false, isValidUser: false, user: {
                    companies: [],
                    id: 0,
                    name: '',
                    email: '',
                    token: '',
                    master: false,
                },
            };
        case Types.SESSION_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
                isValidUser: true,
                error: false,
            };
        case Types.LOGOUT:
            return { ...state, loadingLogout: true, errorLogout: false };
        case Types.LOGOUT_FAILURE:
            return { ...state, loadingLogout: false, errorLogout: true };
        case Types.LOGOUT_SUCCESS:
            return { ...INITIAL_STATE };
        default:
            return state;
    }
};

export default reducer;
