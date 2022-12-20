import { Types as TokenTypes } from './types';
import { LoginUser } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const TokenSaga = [
    takeLatest(TokenTypes.SESSION, LoginUser),
    //takeLatest(TokenTypes.LOGOUT, LogoutUser)
]