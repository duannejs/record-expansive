import { call, put } from 'redux-saga/effects';
import {
    GetDocumentosSuccess,
    GetDocsFailure,
    DocsSaveSucess,
    DocDeleteSucess,
    DocDeleteFailed
} from './actions';
import { API } from '../../../service/api/requestFactory';
import { ROUTES } from '../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../component/actions';
import { GetVehicles } from '../vehicles/actions';


export function* getIDocumentos({ payload }: any): any {
    try {
        const res: ResponseGenerator = yield call(API.get, ROUTES.DOCUMENTS, {});  
        yield put(GetVehicles(res.data.protocoloId)); 
        yield put(GetDocumentosSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO GetDocumentosSuccess', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetDocsFailure(e.response?.status || 401));
        }
    }
}


export function* DeleteDocs({ payload }: any) {    try {
       
        const res: ResponseGenerator = yield call(API.delete, ROUTES.DOCUMENTS, { data: { id: payload.id } });
        yield put(DocDeleteSucess(payload.id));
    } catch ({ message, response }) {
        console.log('\x1b[31mERRO AO DELETE DOCS', message);
        yield put(DocDeleteFailed(400));
    }
}


export function* SaveDocs({ payload }: any) {
    try {
        const res: ResponseGenerator = yield call(API.post, ROUTES.DOCUMENTS, {
            data: payload.data,
            status: payload.status,
            descricao: payload.descricao,
            conteudo: payload.conteudo,
            destinatario: payload.destinatario,
            categoria: payload.categoria,
            setor: payload.setor,
            url: payload.url,
            file_name: payload.file_name,
            company: payload.company,
            valor: payload.valor,
            data_pagamento: payload.data_pagamento,
            pix: payload.pix,
            id_protocolo: payload.id_protocolo
        });
        yield put(DocsSaveSucess());
    } catch ({ message, response }) { 
        alert('Erro ao Inserir Item')      
        console.log('\x1b[31mERRO AO DELETE DOCS', message);
        yield put(GetDocsFailure(400));
    }
}



export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}




