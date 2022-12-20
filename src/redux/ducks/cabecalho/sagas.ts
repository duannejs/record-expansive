import { call, put } from 'redux-saga/effects';
import {
    GetCabecalhoSuccess,
} from './actions';
import { API } from '../../../service/api/requestFactory';
import { ROUTES } from '../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../component/actions';
import { CategoryUpdateSucess } from '../categorias/actions';



interface IResponse {
    data: [];
    status: number;
}

export function* updateCabecalho({ payload }: any): any {
    try {              
        const res: IResponse = yield call(API.put, ROUTES.CABECALHOS, {           
            status: payload.status, 
            cobranca: payload.cobranca,              
            id_user_aprov: payload.id_user_aprov,
            id: payload.id   
        });
        yield put(CategoryUpdateSucess());
    } catch (e) {
        console.log('SAGA ERRO updateCategory', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));            
        }
    }
}


export function* getCabecalhos({ payload }: any): any {
    try {
        const res: IResponse = yield call(API.get, ROUTES.CABECALHO, {});
        yield put(GetCabecalhoSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetCategoryFailure', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
        }
    }
}


