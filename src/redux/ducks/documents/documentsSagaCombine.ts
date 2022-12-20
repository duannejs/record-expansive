import { Types as DocsTypes } from './types';
import { takeLatest } from 'redux-saga/effects';
import { getIDocumentos , SaveDocs , DeleteDocs} from './sagas';

export const DocumentsSaga = [
    takeLatest(DocsTypes.DOCUMENTOS, getIDocumentos),
    takeLatest(DocsTypes.DOCS_SAVED, SaveDocs),
    takeLatest(DocsTypes.DELETE, DeleteDocs)
]
