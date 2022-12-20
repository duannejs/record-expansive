import { call, put } from 'redux-saga/effects';
import {
    GetVehiclesSuccess,
    GetVehiclesFailure,
    VehiclesSaveSucess,
    VehiclesDeleteSucess,
    VehiclesDeleteFailed,
    GetVehicles
} from './actions';
import { API } from '../../../service/api/requestFactory';
import { ROUTES } from '../../../service/api/apiRoutes';
import { AxiosError } from 'axios';
import { ErrorToast } from '../component/actions';


export function* getIVehicles({ payload }: any): any {
    try {      
        const res: ResponseGenerator = yield call(API.put, ROUTES.VEHICLES, {
            id_protocolo: payload.id,
        });       
        yield put(GetVehiclesSuccess(res.data));
    } catch (e) {       
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetVehiclesFailure(e.response?.status || 401));
        }
    }
}


export function* DeleteVehicles({ payload }: any) {
    try {
        const res: ResponseGenerator = yield call(API.delete, ROUTES.VEHICLES, { data: { id: payload.id } });
        yield put(VehiclesDeleteSucess(payload.id));
    } catch ({ message, response }) {
        console.log('\x1b[31mERRO AO DELETE DOCS', message);
        yield put(VehiclesDeleteFailed(400));
    }
}


export function* SaveVehicles({ payload }: any) {
    try {
        const res: ResponseGenerator = yield call(API.post, ROUTES.VEHICLES, {
            km_inicial: payload.kmIni,
            km_final: payload.kmFim,
            trajeto: payload.trajeto,
            data: payload.data,
            percorrido: payload.percorrido,
            id_protocolo: payload.id_protocolo
        });
        yield put(VehiclesSaveSucess());
        yield put(GetVehicles(payload.id_protocolo)); 
    } catch ({ message, response }) {
        alert('Erro ao Inserir Item')
        console.log('\x1b[31mERRO KM', message);
        yield put(GetVehiclesFailure(400));
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