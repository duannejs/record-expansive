import { call, put } from 'redux-saga/effects';
import {
    GetDocumentosSuccess,
} from './actions';
import { API } from '../../../service/api/requestFactory';
import { ROUTES } from '../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../component/actions';


export function* getIDocumentosbyId({ payload }: any): any {
    try {       
        const res: ResponseGenerator = yield call(API.post, ROUTES.DOCUMENTSID, {  id: payload.id });
        yield put(GetDocumentosSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetDocumentosYDSuccess', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));           
        }
    }
}


export interface ResponseGenerator {
    data: [];
    status: number;
}




