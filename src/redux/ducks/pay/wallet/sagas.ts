import { call, put } from 'redux-saga/effects';
import {
    GetWalletOptionsFailed,
    GetWalletOptionsSuccess,
    GetWalletPaginatedFailure,
    GetWalletPaginatedSuccess,
} from './actions';
import { getFieldFilter, IWalletOptions, IWalletsPaginated } from './types';
import { API_PAY } from '../../../../service/api/requestFactory';
import { ROUTES } from '../../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../../component/actions';
import { getSorting } from '../../../../utils/functions';

interface IResponse {
    data: IWalletsPaginated;
    status: number;
}

export function* WalletPaginated({ payload }: any): any {
    const { page = 0, size = 1, filters, sorting } = payload;
    try {
        const res: IResponse = yield call(API_PAY.get, ROUTES.PAY_WALLETS, { params: { page, size, ...getSorting(getFieldFilter(sorting.field), sorting.sort), ...filters } });
        console.log(`SAGA GetWalletPaginated [PAGE: ${page}] - [SIZE:${size}] - [FILTER:${JSON.stringify(filters)}]`);
        yield put(GetWalletPaginatedSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetWalletPaginated', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetWalletPaginatedFailure(e.response?.status || 401));
        }
    }
}


interface IResponseList {
    data: IWalletOptions[];
    status: number
}

export function* WalletOptions(): any {
    try {
        const res: IResponseList = yield call(API_PAY.get, ROUTES.PAY_WALLET_OPTIONS);
        console.log(`SAGA WalletOptions`, res.data);
        yield put(GetWalletOptionsSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO WalletOptions', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetWalletOptionsFailed(e.response?.status || 401));
        }
    }
}