/* eslint-disable no-case-declarations */
import { Types, IWalletDetailTypes } from './types';

const INITIAL_STATE: IWalletDetailTypes = {
    dataWallet: {
        tenant: {
            companyId: 0,
            id: "",
            walletId: 0,
            wallet: "",
            status: false,
            interval: 0,
            timeout: 0,
            updateAt: "",
            userId: "",
            codFinalizadora: 0,
        },
        processes: [],
        params: [],
        stores: []
    },
    loading: true,
    awaitConfirm: false,
    error: false,
    inputData: {
        input: [],
        error: false,
        loading: false,
    },
    stepsData: {
        steps: [],
        error: false,
        loading: false,
    },
    paramsData: {
        params: [],
        error: false,
        loading: false,
    }
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.GET_DETAIL_WALLET:
            return { ...state, loading: true, error: false, awaitConfirm: false };
        case Types.GET_DETAIL_WALLET_FAILURE:
            return { ...state, loading: false, error: action?.payload?.err || 401, awaitConfirm: false };
        case Types.GET_DETAIL_WALLET_SUCCESS:
            return {
                ...state,
                dataWallet: action.payload,
                loading: false,
                error: false,
                awaitConfirm: false
            };

        case Types.GET_INPUTS_WALLET:
            return { ...state, inputData: { input: [], loading: true, error: false } };
        case Types.GET_INPUTS_WALLET_FAILURE:
            return { ...state, inputData: { input: [], loading: false, error: true } };
        case Types.GET_INPUTS_WALLET_SUCCESS:
            return { ...state, inputData: { input: action.payload, loading: false, error: false } };


        case Types.GET_STEPS_WALLET:
            return { ...state, stepsData: { steps: [], loading: true, error: false } };
        case Types.GET_STEPS_WALLET_FAILURE:
            return { ...state, stepsData: { steps: [], loading: false, error: true } };
        case Types.GET_STEPS_WALLET_SUCCESS:
            return { ...state, stepsData: { steps: action.payload, loading: false, error: true } };

        case Types.GET_WALLET_PARAM:
            return { ...state, paramsData: { params: [], loading: true, error: false } };
        case Types.GET_WALLET_PARAM_SUCCESS:
            return { ...state, paramsData: { params: action.payload, loading: false, error: false } };
        case Types.GET_WALLET_PARAM_FAILURE:
            return { ...state, paramsData: { params: [], loading: false, error: true } };

        case Types.PUT_WALLET_TENANT:
            return { ...state, awaitConfirm: true };
        case Types.PUT_WALLET_TENANT_SUCCESS:
            return { ...state, dataWallet: { ...state.dataWallet, tenant: action.payload }, awaitConfirm: false }
        case Types.PUT_WALLET_TENANT_FAILURE:
            return { ...state, awaitConfirm: false }

        case Types.PUT_WALLET_PROCESS:
            return { ...state, awaitConfirm: true };
        case Types.PUT_WALLET_PROCESS_SUCCESS:
            return { ...state, dataWallet: { ...state.dataWallet, process: action.payload }, awaitConfirm: false }
        case Types.PUT_WALLET_PROCESS_FAILURE:
            return { ...state, awaitConfirm: false }

        case Types.DELETE_WALLET_PROCESS:
            return { ...state };
        case Types.DELETE_WALLET_PROCESS_SUCCESS:
            return { ...state, dataWallet: { ...state.dataWallet, process: action.payload }, awaitConfirm: false }
        case Types.DELETE_WALLET_PROCESS_FAILURE:
            return { ...state, awaitConfirm: false }

        case Types.PUT_WALLET_STORE:
            return { ...state, awaitConfirm: true };
        case Types.PUT_WALLET_STORE_SUCCESS:
            return { ...state, awaitConfirm: false, dataWallet: { ...state.dataWallet, stores: action.payload } };
        case Types.PUT_WALLET_STORE_FAILURE:
            return { ...state, awaitConfirm: false };

        case Types.PUT_WALLET_PARAM:
            return { ...state, awaitConfirm: true };
        case Types.PUT_WALLET_PARAM_SUCCESS:
            return { ...state, awaitConfirm: false, dataWallet: { ...state.dataWallet, params: action.payload } };
        case Types.PUT_WALLET_PARAM_FAILURE:
            return { ...state, awaitConfirm: false };

        case Types.DELETE_WALLET_STORE:
            return { ...state };
        case Types.DELETE_WALLET_STORE_SUCCESS:
            return { ...state, awaitConfirm: false, dataWallet: { ...state.dataWallet, stores: action.payload } };
        case Types.DELETE_WALLET_STORE_FAILURE:
            return { ...state, awaitConfirm: false };

        default:
            return state;
    }
};

export default reducer;
