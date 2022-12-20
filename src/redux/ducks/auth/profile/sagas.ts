import { call, put } from 'redux-saga/effects';
import {
    PermissionUserFailure,
    PermissionUserSuccess,
} from './actions';
import { API } from '../../../../service/api/requestFactory';
import { AxiosError } from 'axios';
import { ErrorToast } from '../../component/actions';
import { ROUTES } from '../../../../service/api/apiRoutes';
import { ResponsePermission } from './types';



export function* PermissionUserReq({ payload }: any): any {
    try {

        let id = payload.idCliente;
        const response: ResponsePermission = yield call(API.post, ROUTES.AUTH_PERMISSION, {
            id_cliente: id,

        });

        console.log('SAGA PermissionUser', response.data);
        yield put(PermissionUserSuccess(response.data));
    } catch (e: any) {
        console.log('SAGA PermissionUser ERROR', e);
        if (e instanceof AxiosError) {
            switch (e.response?.status) {
                case 401:
                case 404:
                    yield put(ErrorToast(1, e.response?.status || -1, e.response?.data, 'error.401-login'));
                    break;
                default:
                    yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
                    break;
            }
            yield put(PermissionUserFailure(e.response?.status || -1));
        }
    }
}

