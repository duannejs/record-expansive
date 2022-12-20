import { PaletteMode } from '@mui/material';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
    CHANGE_THEME: '@webConfig/CHANGE_THEME',
};

export interface IWebConfig {
    mode: PaletteMode;
}