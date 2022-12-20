import { call, put, select } from 'redux-saga/effects';
import {
    GetOrderPaginatedFailure,
    GetOrderPaginatedSuccess
} from './actions';
import { getFieldFilter, IOrdersPaginated } from './types';
import { API } from '../../../../service/api/requestFactory';
import { ROUTES } from '../../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../../component/actions';
import { getSorting } from '../../../../utils/functions';
import { AppStore } from '../../../IAppStore';
import { IStoreProfile } from '../../auth/profile/types';

interface IResponse {
    data: IOrdersPaginated;
    status: number;
}


function getStores(stores: IStoreProfile[], filters: any): any[] {
    if (!filters.storeId) {
        filters.storeId = stores.map(i=> i.storeId).join(',');
    }
    return filters;
}

export function* OrderPaginated({ payload }: any): any {
    const { profile } = yield select((state: AppStore) => state)
    const { page = 0, size = 1, filters, sorting } = payload;
    const filtersWithParam = getStores(profile.userInfo.stores, filters);
    try {
        const res: IResponse = yield call(API.get, ROUTES.PAY_ORDER, { params: { page, size, ...getSorting(getFieldFilter(sorting.field), sorting.sort), ...filtersWithParam } });
        console.log(`SAGA GetOrderPaginated [PAGE: ${page}] - [SIZE:${size}] - [FILTER:${JSON.stringify(filters)}]`);
        yield put(GetOrderPaginatedSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetOrderPaginated', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetOrderPaginatedFailure(e.response?.status || 401));
        }
    }
}


