import { Types } from './types';
import { action } from 'typesafe-actions';


export const ErrorToast = (type: number, code: number, message?: string) => {
    let msg = message;
    if (!message) {
        msg = `error.${code}`;
    }
    return action(Types.TOAST, { type, message: msg });
};


export const ErrorToastHide = () => {
    return action(Types.TOAST_HIDE);
};