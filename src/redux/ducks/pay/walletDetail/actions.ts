import { IWalletData, IWalletSteps, IWalletStepsOpts, IWalletTenant, Types } from './types';
import { action } from 'typesafe-actions';

export const GetWalletDetail = (id: any) => {
    return action(Types.GET_DETAIL_WALLET, { id });
};

export const GetWalletDetailFailure = (err: number) => {
    return action(Types.GET_DETAIL_WALLET_FAILURE, { err });
};

export const GetWalletDetailSuccess = (wallet: IWalletData) => {
    return action(Types.GET_DETAIL_WALLET_SUCCESS, wallet);
};

///----------------

export const GetWalletInput = () => {
    return action(Types.GET_INPUTS_WALLET);
};

export const GetWalletInputFailure = (err: number) => {
    return action(Types.GET_INPUTS_WALLET_FAILURE, { err });
};

export const GetWalletInputSuccess = (inputs: string[]) => {
    return action(Types.GET_INPUTS_WALLET_SUCCESS, inputs);
};

///----------------
export const GetWalletSteps = (id: any) => {
    return action(Types.GET_STEPS_WALLET, { id });
};

export const GetWalletStepsFailure = (err: number) => {
    return action(Types.GET_STEPS_WALLET_FAILURE, { err });
};

export const GetWalletStepsSuccess = (steps: IWalletStepsOpts[]) => {
    return action(Types.GET_STEPS_WALLET_SUCCESS, steps);
};
///----------------

export const putWalletTenant = (payload: any) => {
    return action(Types.PUT_WALLET_TENANT, payload)
}

export const putWalletTenantSuccess = (responseData: IWalletTenant) => {
    return action(Types.PUT_WALLET_TENANT_SUCCESS, responseData)
}

export const putWalletTenantFailure = (err: number) => {
    return action(Types.PUT_WALLET_TENANT_FAILURE, { err })
}

//-----------------

export const putWalletProcess = (payload: any) => {
    return action(Types.PUT_WALLET_PROCESS, payload)
}

export const putWalletProcessSuccess = (responseData: any) => {
    return action(Types.PUT_WALLET_PROCESS_SUCCESS, responseData)
}

export const putWalletProcessFailure = (err: number) => {
    return action(Types.PUT_WALLET_PROCESS_FAILURE, err)
}

export const deleteWalletProcess = (payload: any) => {
    return action(Types.DELETE_WALLET_PROCESS, payload);
}

export const deleteWalletProcessSuccess = (responseData: any) => {
    return action(Types.DELETE_WALLET_PROCESS_SUCCESS, responseData)
}

export const deleteWalletProcessFailure = (err: number) => {
    return action(Types.DELETE_WALLET_PROCESS_FAILURE, err)
}

//----------------

export const deleteWalletStore = (payload: any) => {
    return action(Types.DELETE_WALLET_STORE, payload)
}

export const deleteWalletStoreSuccess = (responseData: any) => {
    return action(Types.DELETE_WALLET_STORE_SUCCESS, responseData);
}

export const deleteWalletStoreFailure = (err: number) => {
    return action(Types.DELETE_WALLET_STORE_FAILURE, err);
}

//---------------

export const putWalletStore = (payload: any) =>{
    return action(Types.PUT_WALLET_STORE, payload)
}

export const putWalletStoreSuccess = (responseData: any) =>{
    return action(Types.PUT_WALLET_STORE_SUCCESS, responseData)
}

export const putWalletStoreFailure = (err: number) =>{
    return action(Types.PUT_WALLET_STORE_FAILURE, err)
}

export const getWalletParam = (id: any) =>{
    return action(Types.GET_WALLET_PARAM, {id})
}

export const getWalletParamSuccess = (responseData: any) =>{
    return action(Types.GET_WALLET_PARAM_SUCCESS, responseData)
}

export const getWalletParamFailure = (err: number) =>{
    return action(Types.GET_WALLET_PARAM_FAILURE, err)
}

export const putWalletParam = (payload: any) =>{
    return action(Types.PUT_WALLET_PARAM, payload);
}

export const putWalletParamSuccess = (responseData: any) =>{
    return action(Types.PUT_WALLET_PARAM_SUCCESS, responseData);
}

export const putWalletParamFailure = (err: number) =>{
    return action(Types.PUT_WALLET_PARAM_FAILURE, err);
}