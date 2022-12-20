/* eslint-disable no-case-declarations */
import { Types, IOrdersTypes } from './types';

const INITIAL_STATE: IOrdersTypes = {
    data: {
        totalPages: 0,
        pageSize: 0,
        sortType: '',
        currentPage: 0,
        totalRegistered: 0,
        pageFrom: 'REPOSITORY',
        data: [],
    },
    loading: false,
    error: false,
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.GET_ORDER:
            return { ...state, loading: true, error: false };
        case Types.GET_ORDER_FAILURE:
            return { ...state, loading: false, error: action?.payload?.err || 401 };
        case Types.GET_ORDER_SUCCESS:
            return {
                ...state,
                data: action.payload.orders,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
};

export default reducer;
