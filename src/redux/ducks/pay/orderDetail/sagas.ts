import { AxiosError } from "axios";
import { call, put } from "redux-saga/effects";
import { ROUTES } from "../../../../service/api/apiRoutes";
import { API} from "../../../../service/api/requestFactory";
import { ErrorToast } from "../../component/actions";
import { GetOrderDetailFailure, GetOrderDetailSuccess } from "./actions";
import { IOrderDetail } from "./types";

interface IResponseDetail {
    data: IOrderDetail;
    status: number;
}

export function* OrderDetail({payload: {id}}: any): any {
    try {
        const res: IResponseDetail = yield call(API_PAY.get, ROUTES.PAT_ORDER_DETAIL, { params: { id } });
        console.log(`SAGA OrderDetail [ID: ${id}]`);
        yield put(GetOrderDetailSuccess(res.data));
    } catch (e) {
        console.log('SAGA ERRO OrderDetail', e);
        if (e instanceof AxiosError) {
            yield put(ErrorToast(1, e.response?.status || -1, e.response?.data));
            yield put(GetOrderDetailFailure(e.response?.status || 401));
        }
    }
}