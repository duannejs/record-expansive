import { Types as DocsTypes } from './types';
import { takeLatest } from 'redux-saga/effects';
import {  getIDocumentosbyId} from './sagas';

export const allDocumentsSaga = [
    takeLatest(DocsTypes.DOCUMENTOSBYID, getIDocumentosbyId)    
]
