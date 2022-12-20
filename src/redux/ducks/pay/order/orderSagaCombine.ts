import { Types as WalletTypes } from './types';
import { OrderPaginated } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const orderSaga = [
    takeLatest(WalletTypes.GET_ORDER, OrderPaginated),
]
