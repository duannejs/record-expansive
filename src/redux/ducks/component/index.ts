/* eslint-disable no-case-declarations */
import { Types, IErrorTypes } from './types';

const INITIAL_STATE: IErrorTypes = {
    title: '',
    display: false,
    message: '',
    type: 0
};

const reducer = (state = INITIAL_STATE, action: any): any => {
    switch (action.type) {
        case Types.TOAST:
            return { ...state, display: true, title: action.payload.title, message: action.payload.message, type: action.payload.type };
        case Types.TOAST_HIDE:
            return { ...state, display: false, title: '', message: '', type: 0 };
        default:
            return state;
    }
};

export default reducer;
