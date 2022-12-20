import { Types as CategoryTypes } from './types';
import {   getCategory, updateCategory } from './sagas';
import { takeLatest } from 'redux-saga/effects';


export const CategorySaga = [
    takeLatest(CategoryTypes.GET_CATEGORY, getCategory),
    takeLatest(CategoryTypes.GET_CATEGORY_UPDATE, updateCategory)
]
