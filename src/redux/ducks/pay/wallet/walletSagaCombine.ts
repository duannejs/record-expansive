import { Types as WalletTypes } from './types';
import { WalletOptions, WalletPaginated } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const walletSaga = [
    takeLatest(WalletTypes.GET_WALLET, WalletPaginated),
    takeLatest(WalletTypes.GET_WALLET_OPTIONS, WalletOptions),
]
