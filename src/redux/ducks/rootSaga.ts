import { all } from 'redux-saga/effects';
import { authSaga } from './auth/authSaga';
import { DocumentsSaga } from './documents/documentsSagaCombine';
import { CategorySaga } from './categorias/categorySagaCombine';
import { paySaga } from './pay/paySaga';
import { CabecalhoSaga } from './cabecalho/cabecalhoSagaCombine';
import { allDocumentsSaga } from './allDocuments/documentsSagaCombine';
import { VehiclesSaga } from './vehicles/documentsSagaCombine';

export default function* rootSaga() {
    yield all([
        ...paySaga,
        ...authSaga,
        ...DocumentsSaga,
        ...CategorySaga,
        ...CabecalhoSaga,
        ...allDocumentsSaga,
        ...VehiclesSaga,
    ])
}
