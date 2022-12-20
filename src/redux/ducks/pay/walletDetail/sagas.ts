import { call, put } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import {
    deleteWalletProcessFailure,
    deleteWalletProcessSuccess,
    deleteWalletStoreFailure,
    deleteWalletStoreSuccess,
    GetWalletDetailFailure,
    GetWalletDetailSuccess,
    GetWalletInputFailure,
    GetWalletInputSuccess,
    getWalletParamFailure,
    getWalletParamSuccess,
    GetWalletStepsFailure,
    GetWalletStepsSuccess,
    putWalletParamFailure,
    putWalletParamSuccess,
    putWalletProcessFailure,
    putWalletProcessSuccess,
    putWalletStoreFailure,
    putWalletStoreSuccess,
    putWalletTenantFailure,
    putWalletTenantSuccess,
} from './actions';
import { IWalletData, IWalletProcesses, IWalletProcessesBody, IWalletSteps, IWalletParams, IWalletStepsOpts, IWalletStores, IWalletTenant, IWalletParamsProps } from './types';
import { API_PAY } from '../../../../service/api/requestFactory';
import { ROUTES } from '../../../../service/api/apiRoutes';
import { ErrorToast } from '../../component/actions';
import { AxiosError } from 'axios';


interface IResponse {
    data: IWalletData;
    status: number;
}

export function* WalletDetail({ payload }: any): any {
    const { id } = payload;
    try {
        const res: IResponse = yield call(API_PAY.get, ROUTES.PAY_FIND_WALLET, { params: { tenantId: id } });
        console.log(`SAGA WalletDetail ${JSON.stringify(res.data)}`);
        res.data.stores?.forEach((store) => {
            store.id = uuidv4();
        })
        yield put(GetWalletDetailSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletDetail', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetWalletDetailFailure(e.response?.status || 401));
        }
    }
}

interface IResponseTenant {
    data: IWalletTenant;
    status: number;
}

export function* WalletSaveTenant({ payload }: any): any {
    try {
        const res: IResponseTenant = yield call(API_PAY.put, ROUTES.PAY_SAVE_WALLET_TENANT, payload);
        console.log(`SAGA WalletSaveTenant ${JSON.stringify(res.data)}`);
        yield put(putWalletTenantSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletSaveTenant', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(putWalletTenantFailure(e.response?.status || 401));
        }
    }
}


interface IResponseInput {
    data: string[];
    status: number;
}


export function* WalletInputs(): any {
    try {
        const res: IResponseInput = yield call(API_PAY.get, ROUTES.PAY_FIND_WALLET_INPUTS);
        console.log(`SAGA WalletInputs ${JSON.stringify(res.data)}`);
        yield put(GetWalletInputSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletInputs', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetWalletInputFailure(e.response?.status || 401));
        }
    }
}

interface IResponseSteps {
    data: IWalletStepsOpts[];
    status: number;
}


export function* WalletSteps({ payload }: any): any {
    const { id } = payload;
    try {
        const res: IResponseSteps = yield call(API_PAY.get, ROUTES.PAY_FIND_WALLET_STEPS, { params: { walletId: id } });
        console.log(`SAGA WalletSteps ${JSON.stringify(res.data)}`);
        yield put(GetWalletStepsSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletSteps', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetWalletStepsFailure(e.response?.status || 401));
        }
    }
}

interface IResponseParams {
    data: IWalletParams;
    status: number;
}

export function* WalletParams({ payload: { id } }: any): any {
    try {
        const res: IResponseParams = yield call(API_PAY.get, ROUTES.PAY_FIND_WALLET_PARAMS, { params: { walletId: id } });
        console.log(`SAGA WalletParams ${JSON.stringify(res.data)}`);
        yield put(getWalletParamSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletParams', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(getWalletParamFailure(e.response?.status || 401));
        }
    }

}

interface IResponseProcesses {
    data: IWalletProcesses[];
    status: number;
}

export function* WalletSaveProcess({ payload: { tenantId, steps } }: any): any {
    let body: IWalletProcessesBody = {
        tenantId, processes: [{
            method: "CONSULTAR",
            steps: steps.map((step: IWalletSteps) => {
                if (step.stepId == '') {
                    step.stepId = null;
                }
                return step;
            })
        }]
    }
    try {
        const res: IResponseProcesses = yield call(API_PAY.put, ROUTES.PAY_SAVE_WALLET_PROCESSES, body);
        console.log(`SAGA WalletSaveProcess ${JSON.stringify(res.data)}`);
        yield put(putWalletProcessSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletSaveProcess', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(putWalletProcessFailure(e.response?.status || 401));
        }
    }
}

export function* WalletDeleteProcess({ payload: { tenantId, fieldName } }: any): any {
    let body = {
        tenantId,
        processes: {
            method: "CONSULTAR",
            fieldName
        }
    }

    try {
        const res: IResponseProcesses = yield call(API_PAY.delete, ROUTES.PAY_DELETE_WALLET_PROCESSES, { data: body });
        console.log(`SAGA WalletDeleteProcess ${JSON.stringify(res.data)}`);
        yield put(deleteWalletProcessSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletDeleteProcess', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(deleteWalletProcessFailure(e.response?.status || 401));
        }
    }
}


interface IResponseStore {
    data: any;
    status: number;
}

export function* WalletSaveStore({ payload: { tenantId, stores } }: any) {
    let data = {
        tenantId,
        stores: stores.map((store: IWalletStores) => {
            store.id = store.store;
            return store;
        })
    }
    try {
        const res: IResponseStore = yield call(API_PAY.put, ROUTES.PAY_SAVE_WALLET_STORE, data);
        console.log(`SAGA WalletSaveStore ${JSON.stringify(res.data)}`);
        yield put(putWalletStoreSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletSaveStore', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(putWalletStoreFailure(e.response?.status || 401));
        }
    }
}


export function* WalletDeleteStore({ payload: { tenantId, storeId } }: any): any {

    let body = {
        tenantId, storeId
    }
    try {
        const res: IResponseStore = yield call(API_PAY.delete, ROUTES.PAY_DELETE_WALLET_STORE, { data: body });
        console.log(`SAGA WalletDeleteStore ${JSON.stringify(res.data)}`);
        yield put(deleteWalletStoreSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletDeleteStore', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(deleteWalletStoreFailure(e.response?.status || 401));
        }
    }
}

interface IResponseParam {
    data: IWalletParams;
    status: number;
}

interface IParamData {
    name: string;
    value: string;
}

export function* WalletSaveParam({ payload: { tenantId, params } }: any): any {
    let body = {
        tenantId, params: params.map((p: IWalletParamsProps) => {
            const param: IParamData = {
                name: p.paramName,
                value: p.defaultValue.trim(),
            }
            return param;
        })
    }
    try {
        const res: IResponseParam = yield call(API_PAY.put, ROUTES.PAY_PUT_WALLET_PARAM, body);
        console.log(`SAGA WalletSaveParam ${JSON.stringify(res.data)}`);
        yield put(putWalletParamSuccess(res.data));
    } catch (e) {
        console.log('SAGA WalletSaveParam', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(putWalletParamFailure(e.response?.status || 401));
        }
    }
}