import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    GET_DETAIL_WALLET: '@walletDetail/GET_DETAIL_WALLET',
    GET_DETAIL_WALLET_FAILURE: '@walletDetail/GET_DETAIL_WALLET_FAILURE',
    GET_DETAIL_WALLET_SUCCESS: '@walletDetail/GET_DETAIL_WALLET_SUCCESS',

    GET_INPUTS_WALLET: '@walletInputs/GET_INPUTS_WALLET',
    GET_INPUTS_WALLET_FAILURE: '@walletInputs/GET_INPUTS_WALLET_FAILURE',
    GET_INPUTS_WALLET_SUCCESS: '@walletInputs/GET_INPUTS_WALLET_SUCCESS',

    GET_STEPS_WALLET: '@walletSteps/GET_STEPS_WALLET',
    GET_STEPS_WALLET_FAILURE: '@walletSteps/GET_STEPS_WALLET_FAILURE',
    GET_STEPS_WALLET_SUCCESS: '@walletSteps/GET_STEPS_WALLET_SUCCESS',

    GET_WALLET_PARAM: '@walletParam/GET_WALLET_PARAM',
    GET_WALLET_PARAM_SUCCESS: '@walletParam/GET_WALLET_PARAM_SUCCESS',
    GET_WALLET_PARAM_FAILURE: '@walletParam/GET_WALLET_PARAM_FAILURE',

    PUT_WALLET_TENANT: '@walletTenant/PUT_WALLET_TENANT',
    PUT_WALLET_TENANT_SUCCESS: '@walletTenant/PUT_WALLET_TENANT_SUCCESS',
    PUT_WALLET_TENANT_FAILURE: '@walletTenant/PUT_WALLET_TENANT_FAILURE',

    PUT_WALLET_PARAM: '@walletParam/PUT_WALLET_PARAM',
    PUT_WALLET_PARAM_SUCCESS: '@walletParam/PUT_WALLET_PARAM_SUCCESS',
    PUT_WALLET_PARAM_FAILURE: '@walletParam/PUT_WALLET_PARAM_FAILURE',

    PUT_WALLET_PROCESS: '@walletProcess/PUT_WALLET_PROCESS',
    PUT_WALLET_PROCESS_SUCCESS: '@walletProcess/PUT_WALLET_PROCESS_SUCCESS',
    PUT_WALLET_PROCESS_FAILURE: '@walletProcess/PUT_WALLET_PROCESS_FAILURE',

    DELETE_WALLET_PROCESS: '@walletProcess/DELETE_WALLET_PROCESS',
    DELETE_WALLET_PROCESS_SUCCESS: '@walletProcess/DELETE_WALLET_PROCESS_SUCCESS',
    DELETE_WALLET_PROCESS_FAILURE: '@walletProcess/DELETE_WALLET_PROCESS_FAILURE',

    PUT_WALLET_STORE: '@walletStore/PUT_WALLET_STORE',
    PUT_WALLET_STORE_SUCCESS: '@walletStore/PUT_WALLET_STORE_SUCCESS',
    PUT_WALLET_STORE_FAILURE: '@walletStore/PUT_WALLET_STORE_FAILURE',

    DELETE_WALLET_STORE: '@walletStore/DELETE_WALLET_STORE',
    DELETE_WALLET_STORE_SUCCESS: '@walletStore/DELETE_WALLET_STORE_SUCCESS',
    DELETE_WALLET_STORE_FAILURE: '@walletStore/DELETE_WALLET_STORE_FAILURE',
};


export interface IWalletTenant {
    companyId: number;
    id: string;
    walletId: number;
    wallet: string;
    status: boolean;
    interval: number;
    timeout: number;
    updateAt: string;
    userId: string;
    codFinalizadora: number;
}

export interface IWalletSteps {
    stepId: string | null;
    fieldName: string;
    inputType: string;
    message: string;
}

export interface IWalletProcesses {
    processId: string;
    method: string;
    steps?: IWalletSteps[];
    updateAt: string;
    userId: string;
}

export interface IWalletProcessesReq {
    method: string;
    steps?: IWalletSteps[];
}

export interface IWalletStores {
    id?: string;
    tenantId: string;
    store: string;
    value: string;
    status: string;
    updateAt: string;
    userId: string;
}

export interface IWalletParams {
    key: string;
    description: string;
    paramId: string;
    updateAt: string;
    userId: string;
    value: string;
}

export interface IWalletParamsProps {
    wallet: string;
    walletId: number;
    paramName: string;
    description: string;
    fieldType: string;
    defaultValue: string;
}
export interface IWalletData {
    tenant: IWalletTenant;
    processes: IWalletProcesses[];
    stores?: IWalletStores[];
    params?: IWalletParams[];
}


export interface IWalletStepsOpts {
    fieldName: string;
    fieldType: string;
    inputType: string;
    description: string;
    required: boolean;
    fixedOption: boolean;
}
export interface IWalletStepsOptsData {
    steps: IWalletStepsOpts[];
    loading: boolean;
    error: boolean;
}

export interface IWalletInputData {
    input: string[];
    loading: boolean;
    error: boolean;
}


export interface IWalletParams {
    wallet: string;
    walletId: number;
    paramName: string;
    description: string;
    fieldType: string;
    defaultValue: string;
}

export interface IWalletParamsData {
    params: IWalletParamsProps[];
    loading: boolean;
    error: boolean;
}

export interface IWalletDetailTypes {
    dataWallet: IWalletData;
    inputData: IWalletInputData;
    stepsData: IWalletStepsOptsData;
    paramsData: IWalletParamsData;
    error: boolean;
    loading: boolean;
    awaitConfirm: boolean;
}

export interface IWalletProcessesBody {
    tenantId: string;
    processes: IWalletProcessesReq[];
}