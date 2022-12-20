import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    TOAST: '@component/TOAST',
    TOAST_HIDE: '@component/TOAST_HIDE'

};

export interface IErrorTypes {
    display: boolean;
    title: string;
    message: string;
    type: number;
}