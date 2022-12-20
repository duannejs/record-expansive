import { Types as WalletTypes } from './types';
import { WalletDetail, WalletInputs, WalletSaveTenant, WalletSteps, WalletSaveProcess, WalletDeleteProcess, WalletSaveParam, WalletDeleteStore, WalletSaveStore, WalletParams } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const walletDetailSaga = [
    takeLatest(WalletTypes.GET_DETAIL_WALLET, WalletDetail),
    takeLatest(WalletTypes.PUT_WALLET_TENANT, WalletSaveTenant),
    takeLatest(WalletTypes.GET_INPUTS_WALLET, WalletInputs),
    takeLatest(WalletTypes.GET_STEPS_WALLET, WalletSteps),
    takeLatest(WalletTypes.GET_WALLET_PARAM, WalletParams),
    takeLatest(WalletTypes.PUT_WALLET_PROCESS, WalletSaveProcess),
    takeLatest(WalletTypes.DELETE_WALLET_PROCESS, WalletDeleteProcess),
    takeLatest(WalletTypes.PUT_WALLET_STORE, WalletSaveStore),
    takeLatest(WalletTypes.DELETE_WALLET_STORE, WalletDeleteStore),
    takeLatest(WalletTypes.PUT_WALLET_PARAM, WalletSaveParam)
]
