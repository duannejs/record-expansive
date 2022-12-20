/* eslint-disable no-case-declarations */
import { Types, IOrderDetailTypes } from './types';

const INITIAL_STATE: IOrderDetailTypes = {
    data: {
        order: {
            id: '',
            storeId: 0,
            pos: 0,
            coupon: 0,
            date: new Date(),
            identifier: '',
            status: 'DENIED',
            value: 0,
            wallet: ''
        },
        history: {
            id: '',
            details: []
        },
        items: [],
        cbc: {
            contract: {
                contractId: 0,
                transactionId: 0,
                sellIdentifier: '',
                nsu: '',
                barCode: '',
                amount: 0,
                value: 0,
                fee: 0,
                status: "",
                qtdeParcel: 0,
                parcels: [],
            },
            customer: {
                identification: '',
                name: ''
            }
        },
        paymentMethod: { value: 0, label: '', type: '' }
    },
    loading: false,
    error: false,
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.GET_ORDER_DETAIL:
            return { ...state, loading: true, error: false };
        case Types.GET_ORDER_DETAIL_FAILURE:
            return { ...state, loading: false, error: action?.payload?.err || 401 };
        case Types.GET_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                data: action.payload.detail,
                loading: false,
                error: false,
            };
        default:
            return state
    }
};

export default reducer;