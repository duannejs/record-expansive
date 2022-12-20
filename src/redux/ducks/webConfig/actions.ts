import { Types } from './types';
import { action } from 'typesafe-actions';


export const changeMode = () => {
    return action(Types.CHANGE_THEME);
};