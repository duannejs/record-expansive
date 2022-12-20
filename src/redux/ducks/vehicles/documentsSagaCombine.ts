import { Types as DocsTypes } from './types';
import { takeLatest } from 'redux-saga/effects';
import { getIVehicles  , SaveVehicles , DeleteVehicles} from './sagas';

export const VehiclesSaga = [
    takeLatest(DocsTypes.VEHICLES, getIVehicles),
    takeLatest(DocsTypes.VEHICLES_SAVED, SaveVehicles),
    takeLatest(DocsTypes.DELETE, DeleteVehicles)
]
