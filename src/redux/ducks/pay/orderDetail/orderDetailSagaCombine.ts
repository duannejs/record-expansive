import { Types as WalletTypes } from './types';
import { OrderDetail } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const orderDetailSaga = [
    takeLatest(WalletTypes.GET_ORDER_DETAIL, OrderDetail),
]
