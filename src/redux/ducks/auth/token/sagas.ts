import { all, call, put } from 'redux-saga/effects';
import {
    SessionLogoutSuccess,
    SessionUserFailure,
    SessionUserSuccess,
} from './actions';
import { API } from '../../../../service/api/requestFactory';
import { AxiosError } from 'axios';
import { ErrorToast } from '../../component/actions';
import { PermissionUser } from '../profile/actions';
import { ROUTES } from '../../../../service/api/apiRoutes';
import { Response } from './types';



export function* LoginUser({ payload }: any): any {
    const { username: email, password } = payload;
    try {
        const response: Response = yield call(API.post, ROUTES.AUTH_TOKEN, {
            email: email,
            password: password,

        });

        yield put(SessionUserSuccess(response.data));

    } catch (e: any) {
        console.log('SAGA LoginUser ERROR', e);
        console.log('SAGA LoginUser ERROR', e.response);
        if (e instanceof AxiosError) {
            switch (e.response?.status) {
                case 400:
                    yield put(ErrorToast(1, e.response?.status || -1, 'Usuário ou senha inválidos'));
                    break;
                case 404:
                    yield put(ErrorToast(1, e.response?.status || -1, 'error.401-login'));
                    break;
                default:
                    yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
                    break;
            }
            yield put(SessionUserFailure(e.response?.status || -1));
        }
    }
}



