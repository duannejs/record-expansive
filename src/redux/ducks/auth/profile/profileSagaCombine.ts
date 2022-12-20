import { Types as ProfileTypes } from './types';
import { PermissionUserReq } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const ProfileSaga = [   
    takeLatest(ProfileTypes.PERMISSIONS, PermissionUserReq)
]