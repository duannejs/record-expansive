import { Types as CabecalhoTypes } from './types';
import {  getCabecalhos, updateCabecalho } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const CabecalhoSaga = [  
    takeLatest(CabecalhoTypes.GET_CABECALHO, getCabecalhos),
    takeLatest(CabecalhoTypes.GET_CABECALHO_UPDATE, updateCabecalho)
]
