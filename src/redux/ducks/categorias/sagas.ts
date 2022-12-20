import { call, put } from 'redux-saga/effects';
import {
    CategoryUpdateSucess,  
    GetCategoryFailure,
    GetCategorySuccess
} from './actions';
import { API } from '../../../service/api/requestFactory';
import { ROUTES } from '../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../component/actions';



interface IResponse {
    data: [];
    status: number;
}

export function* getCategory({ payload }: any): any {
    try {
        const res: IResponse = yield call(API.get, ROUTES.CATEGORYS, {});
        yield put(GetCategorySuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetCategoryFailure', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetCategoryFailure(e.response?.status || 401));
        }
    }
}


export function* updateCategory({ payload }: any): any {
    try {    
        const res: IResponse = yield call(API.put, ROUTES.CABECALHO, {
            data_inicial: payload.dataIni,
            data_final: payload.dataFim,
            status: payload.status,
            cliente: payload.cliente,
            id: payload.id,
            id_protocolo: payload.id_protocolo,
            obs: payload.obs,
            cobranca: payload.cobranca,
            id_user_aprov: payload.id_user_aprov,
            veiculo: payload.veiculo,
            vl_km: payload.vl_km
        });
        yield put(CategoryUpdateSucess());
    } catch (e) {
        console.log('SAGA ERRO updateCategory', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetCategoryFailure(e.response?.status || 401));
        }
    }
}



